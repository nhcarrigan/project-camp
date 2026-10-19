import { defineRelations } from "drizzle-orm";
import { projectMembers } from "./project-members";
import { projectMilestones } from "./project-milestones";
import { projectSkills } from "./project-skills";
import { projectVotes } from "./project-votes";
import { projects } from "./projects";
import { skills } from "./skills";
import { users } from "./users";

/**
 * Global relational mappings for Drizzle ORM query builder.
 *
 * Keeping defineRelations centralized in a dedicated file avoids circular module dependencies
 * between entity definitions and provides a single declarative map for all foreign-key relationships.
 */
export const relations = defineRelations(
  {
    users,
    skills,
    projects,
    projectSkills,
    projectVotes,
    projectMembers,
    projectMilestones,
  },
  (r) => ({
    users: {
      ownedProjects: r.many.projects(),
      votes: r.many.projectVotes(),
      memberships: r.many.projectMembers(),
    },
    skills: {
      projectSkills: r.many.projectSkills(),
    },
    projects: {
      owner: r.one.users({
        from: r.projects.ownerId,
        to: r.users.id,
      }),
      projectSkills: r.many.projectSkills(),
      votes: r.many.projectVotes(),
      members: r.many.projectMembers(),
      milestones: r.many.projectMilestones(),
    },
    projectSkills: {
      project: r.one.projects({
        from: r.projectSkills.projectId,
        to: r.projects.id,
      }),
      skill: r.one.skills({
        from: r.projectSkills.skillId,
        to: r.skills.id,
      }),
    },
    projectVotes: {
      project: r.one.projects({
        from: r.projectVotes.projectId,
        to: r.projects.id,
      }),
      user: r.one.users({
        from: r.projectVotes.userId,
        to: r.users.id,
      }),
    },
    projectMembers: {
      project: r.one.projects({
        from: r.projectMembers.projectId,
        to: r.projects.id,
      }),
      user: r.one.users({
        from: r.projectMembers.userId,
        to: r.users.id,
      }),
    },
    projectMilestones: {
      project: r.one.projects({
        from: r.projectMilestones.projectId,
        to: r.projects.id,
      }),
    },
  }),
);
