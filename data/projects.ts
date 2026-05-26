export type Project = {
  path: string
  project: string
  date: string
  tech: string
  description: string
}

export const projects: Project[] = [
  {
    path: '/os_stats.png',
    project: 'Open Source Stats',
    date: 'October 2024 - Present',
    tech: 'Python, GitHub API',
    description: 'Contributed to Python CLI tool that retrieves commits and pull requests from acmcsufoss GitHub organization',
  },
  {
    path: '/global_city_explorer.png',
    project: 'Global City Explorer - FullyHacks Project',
    date: 'April 2025 - April 2025',
    tech: 'Javascript, HTML, CSS, SvelteKit',
    description: 'Developed a real-time global city information app using SvelteKit, enabling users to search and view key data',
  },
  {
    path: '/geometric_calculator.png',
    project: 'Geometric Shapes Calculator',
    date: 'March 2024 - May 2024',
    tech: 'JavaScript, HTML, CSS',
    description: 'Developed a web application to calculate the area and volume of 2D and 3D geometric shapes',
  },
  {
    path: '/password.png',
    project: 'Secure Password Generator',
    date: 'February 2024 - April 2024',
    tech: 'JavaScript, HTML, CSS',
    description: 'Developed a robust JavaScript application for generating secure passwords based on user-defined strength levels',
  },
]
