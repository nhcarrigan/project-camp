import React from "react";

/**
 * Projects table directory component.
 *
 * Where used:
 * - Rendered in the main projects index page (`apps/web/app/projects/page.tsx`).
 *
 * How used:
 * - Renders `<table id="project-table">` displaying project metadata including project name, author, skill level, and programming language.
 */
export function ProjectsTable() {
  return (
    <table id="project-table">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Author</th>
          <th>Skill level</th>
          <th>Programming language</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sample project</td>
          <td>Sample author</td>
          <td>Beginner</td>
          <td>C#</td>
        </tr>
      </tbody>
    </table>
  );
}
