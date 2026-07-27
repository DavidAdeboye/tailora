import { supabase } from "./supabase";

/**
 * Resolves the current user's workspace identity.
 *
 * Priority:
 *  1. If the user has their own profile (they are a workspace Owner), use their
 *     own ID as workspaceOwnerId and role = "Owner".
 *  2. Otherwise, check if they are a team member in someone else's workspace
 *     via the `get_my_team_role` RPC, and use that owner's ID.
 *
 * This prevents the bug where an Owner who is *also* listed as a team member
 * in another workspace would have their workspaceOwnerId overwritten to the
 * other owner's ID, causing them to see someone else's clients/orders.
 */
export interface WorkspaceIdentity {
  /** The auth user's own UUID */
  userId: string;
  /** The UUID of the workspace owner whose data should be displayed */
  workspaceOwnerId: string;
  /** The resolved role: Owner, Admin, Tailor, Assistant */
  role: "Owner" | "Admin" | "Tailor" | "Assistant";
  /** Display name for team members (empty for Owners) */
  memberDisplayName: string;
}

export async function resolveWorkspace(): Promise<WorkspaceIdentity | null> {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) return null;

  const userId = user.id;

  // 1. Check if this user owns a workspace (has a profile row)
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();


  if (profile) {
    // User has their own profile → they are an Owner.
    // They should always see their own workspace on the dashboard.
    return {
      userId,
      workspaceOwnerId: userId,
      role: "Owner",
      memberDisplayName: "",
    };
  }

  // 2. No own profile → check if they are a team member elsewhere
  const { data: rpcResult, error: rpcErr } = await supabase.rpc(
    "get_my_team_role"
  );

  if (!rpcErr && rpcResult && rpcResult.length > 0) {
    const member = rpcResult[0];
    return {
      userId,
      workspaceOwnerId: member.owner_id,
      role: (member.role as WorkspaceIdentity["role"]) || "Tailor",
      memberDisplayName: member.name || "",
    };
  }

  // 3. Fallback: neither Owner nor team member – treat as Owner of empty workspace
  return {
    userId,
    workspaceOwnerId: userId,
    role: "Owner",
    memberDisplayName: "",
  };
}
