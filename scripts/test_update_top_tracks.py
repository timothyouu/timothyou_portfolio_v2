import json
import io
import unittest
from unittest.mock import patch
import update_top_tracks as updater


class RefreshTests(unittest.TestCase):
    def test_errors_do_not_disclose_credentials(self):
        with patch.object(updater, 'main', side_effect=RuntimeError('dummy-key dummy-token')), patch('sys.stderr', new_callable=io.StringIO) as stderr:
            self.assertEqual(updater.run(), 1)
            self.assertNotIn('dummy-key', stderr.getvalue())
            self.assertNotIn('dummy-token', stderr.getvalue())

    def run_payload(self, payload):
        with patch.dict('os.environ', {
            'LASTFM_USER': 'test', 'LASTFM_API_KEY': 'fake',
            'BLOB_READ_WRITE_TOKEN': 'fake',
        }), patch.object(updater.requests, 'get') as get, patch.object(updater.blob, 'put_blob') as put:
            get.return_value.json.return_value = payload
            try:
                result = updater.main()
            except (ValueError, TypeError, KeyError):
                result = 1
            return result, put.call_args

    def test_valid_unicode_trimmed(self):
        result, call = self.run_payload({'toptracks': {'track': [
            {'name': ' Song ', 'artist': {'name': ' María '}}
        ]}})
        self.assertEqual(result, 0)
        self.assertEqual(json.loads(call.args[1]), [{'name': 'Song', 'artist': 'María'}])
        self.assertTrue(call.kwargs['allow_overwrite'])
        self.assertEqual(call.kwargs['cache_control_max_age'], 300)

    def test_invalid_fields_never_upload(self):
        for field in ('name', 'artist'):
            for value in ('', '  ', None, 5):
                track = {'name': 'Song', 'artist': {'name': 'Artist'}}
                if field == 'name':
                    track['name'] = value
                else:
                    track['artist']['name'] = value
                with self.subTest(field=field, value=value):
                    result, call = self.run_payload({'toptracks': {'track': [track]}})
                    self.assertEqual(result, 1)
                    self.assertIsNone(call)

    def test_invalid_shapes_never_upload(self):
        for payload in (None, [], {}, {'error': 6}, {'toptracks': None},
                        {'toptracks': {'track': []}}, {'toptracks': {'track': 'bad'}},
                        {'toptracks': {'track': [None]}}):
            with self.subTest(payload=payload):
                result, call = self.run_payload(payload)
                self.assertEqual(result, 1)
                self.assertIsNone(call)


if __name__ == '__main__':
    unittest.main()
