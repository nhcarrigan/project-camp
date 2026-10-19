import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { insertUserSchema, updateUserProfileSchema, userSchema } from "./users";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Users Schema", () => {
  it("validates user schema with valid inputs", () => {
    const validUser = {
      id: VALID_UUID,
      email: "dev@freecodecamp.org",
      name: "Jane Dev",
      role: "contributor",
      bio: "Full stack open-source contributor",
      githubUsername: "janedev",
      website: "https://example.com",
      reputationScore: 120,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const parsed = userSchema.parse(validUser);
    assert.equal(parsed.name, "Jane Dev");
    assert.equal(parsed.reputationScore, 120);
    assert.ok(parsed.createdAt instanceof Date);
  });

  it("validates insertUserSchema and rejects invalid email", () => {
    const valid = {
      email: "new@example.com",
      name: "New Contributor",
    };
    const parsed = insertUserSchema.parse(valid);
    assert.equal(parsed.role, "member");

    assert.throws(() =>
      insertUserSchema.parse({
        email: "not-an-email",
        name: "Test",
      }),
    );
  });

  it("validates updateUserProfileSchema", () => {
    const updated = updateUserProfileSchema.parse({
      bio: "Updated bio",
      website: "https://janedev.io",
    });
    assert.equal(updated.bio, "Updated bio");
    assert.equal(updated.website, "https://janedev.io");
  });
});
