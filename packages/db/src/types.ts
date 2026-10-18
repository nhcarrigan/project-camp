import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type {
  milestoneStatusEnum,
  projectDifficultyEnum,
  projectMemberRoleEnum,
  projectMemberStatusEnum,
  projectStatusEnum,
  skillCategoryEnum,
  userRoleEnum,
  voteTypeEnum,
} from "./constants";
import type {
  projectMembers,
  projectMilestones,
  projects,
  projectSkills,
  projectVotes,
  skills,
  testTable,
  users,
} from "./schemas";

// ============================================================================
// Enum Types
// ============================================================================

export type UserRole = (typeof userRoleEnum.enumValues)[number];
export type ProjectStatus = (typeof projectStatusEnum.enumValues)[number];
export type ProjectDifficulty =
  (typeof projectDifficultyEnum.enumValues)[number];
export type VoteType = (typeof voteTypeEnum.enumValues)[number];
export type SkillCategory = (typeof skillCategoryEnum.enumValues)[number];
export type ProjectMemberRole =
  (typeof projectMemberRoleEnum.enumValues)[number];
export type ProjectMemberStatus =
  (typeof projectMemberStatusEnum.enumValues)[number];
export type MilestoneStatus = (typeof milestoneStatusEnum.enumValues)[number];

// ============================================================================
// Model Types (Select & Insert)
// ============================================================================

// Users
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// Skills
export type Skill = InferSelectModel<typeof skills>;
export type NewSkill = InferInsertModel<typeof skills>;

// Projects
export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;

// Project Skills
export type ProjectSkill = InferSelectModel<typeof projectSkills>;
export type NewProjectSkill = InferInsertModel<typeof projectSkills>;

// Project Votes
export type ProjectVote = InferSelectModel<typeof projectVotes>;
export type NewProjectVote = InferInsertModel<typeof projectVotes>;

// Project Members
export type ProjectMember = InferSelectModel<typeof projectMembers>;
export type NewProjectMember = InferInsertModel<typeof projectMembers>;

// Project Milestones
export type ProjectMilestone = InferSelectModel<typeof projectMilestones>;
export type NewProjectMilestone = InferInsertModel<typeof projectMilestones>;

// Legacy Test Table
export type TestTable = InferSelectModel<typeof testTable>;
export type NewTestTable = InferInsertModel<typeof testTable>;

// ============================================================================
// Composite & Relation Types
// ============================================================================

export type ProjectWithOwner = Project & {
  owner: User;
};

export type ProjectWithSkills = Project & {
  skills: Skill[];
};

export type ProjectWithDetails = Project & {
  owner: User;
  skills: Skill[];
  members?: (ProjectMember & { user: User })[];
  milestones?: ProjectMilestone[];
};
