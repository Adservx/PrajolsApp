# Supabase MCP Server Setup Guide

This guide explains how to set up and use the Supabase Model Context Protocol (MCP) server for enhanced development and debugging capabilities.

## What is Supabase MCP?

The Supabase MCP server provides AI assistants and development tools with direct, managed access to your Supabase project, enabling:

- Execute SQL queries directly
- Manage migrations
- Deploy Edge Functions
- List and inspect database tables
- Generate TypeScript types
- View real-time logs
- Check security advisories

## Prerequisites

- Supabase project already created
- Supabase CLI installed: `npm install -g supabase`
- Supabase access token

## Step 1: Get Supabase Access Token

### Option A: Via Dashboard (Recommended)

1. Go to https://app.supabase.com
2. Click your profile icon (top right)
3. Select **Account Settings**
4. Navigate to **Access Tokens** tab
5. Click **Generate New Token**
6. Name it: "MCP Server Token"
7. Copy the token (you won't see it again!)

### Option B: Via CLI

```bash
supabase login
```

This will open a browser for authentication and store your token locally.

## Step 2: Configure MCP Server

The Supabase MCP server can be configured in your AI assistant or development environment.

### For Claude Desktop / Cline / Other MCP Clients

Create or edit the MCP configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add the Supabase MCP server:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server@latest"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sbp_your_access_token_here",
        "SUPABASE_PROJECT_ID": "your-project-id"
      }
    }
  }
}
```

### Finding Your Project ID

**Method 1 - From URL**:
- Your Supabase dashboard URL: `https://app.supabase.com/project/abcdefghijklmnop`
- Project ID is: `abcdefghijklmnop`

**Method 2 - From Project Settings**:
1. Supabase Dashboard → **Settings** → **General**
2. Copy **Reference ID**

## Step 3: Restart MCP Client

Restart your AI assistant or IDE to load the new MCP server configuration.

## Step 4: Verify Connection

Test the connection by asking your AI assistant to:

```
List all Supabase projects
```

Expected response: A list of your Supabase projects including the SchoolManagement project.

## Available MCP Tools

Once configured, these tools become available:

### Database Operations

**`execute_sql`**: Run SQL queries directly
```sql
SELECT * FROM students LIMIT 5;
```

**`list_tables`**: View all tables in schema
```
List all tables in public schema
```

**`apply_migration`**: Create and apply database migrations
```sql
ALTER TABLE students ADD COLUMN phone_number TEXT;
```

### Project Management

**`list_projects`**: List all your Supabase projects

**`get_project`**: Get details for a specific project
- Shows: Status, region, database version, etc.

### Type Generation

**`generate_typescript_types`**: Generate TypeScript types from database schema

This will create type-safe interfaces matching your database schema:
```typescript
export interface Student {
  id: string;
  name: string;
  email: string;
  grade: number;
  enrollment_date: string;
  user_id: string | null;
}
```

### Logs & Monitoring

**`get_logs`**: Retrieve logs by service type
- Service types: `api`, `postgres`, `edge-function`, `auth`, `storage`, `realtime`

Example:
```
Show me the last 50 auth logs
```

### Security Advisories

**`get_advisors`**: Check for security or performance issues
- Types: `security`, `performance`

Example:
```
Check for security advisories in my project
```

This is especially useful for catching missing RLS policies!

## Common Use Cases

### 1. Quick Database Queries

Instead of opening Supabase dashboard:

```
Show me all students enrolled in 2024
```

MCP executes:
```sql
SELECT * FROM students 
WHERE enrollment_date >= '2024-01-01' 
AND enrollment_date < '2025-01-01';
```

### 2. Check Missing RLS Policies

```
Run security advisories on my database
```

Will alert you to tables without proper RLS policies.

### 3. Generate Updated Types

After schema changes:

```
Generate TypeScript types for my database
```

Copy the output to `lib/supabase.ts` to keep types in sync.

### 4. Debug Real-time Issues

```
Show me the last 20 realtime logs
```

Helps debug subscription problems.

### 5. Apply Schema Changes

```
Add a 'phone_number' column to the students table
```

MCP will:
1. Create a migration
2. Apply it to the database
3. Show the result

## Security Considerations

### Access Token Security

⚠️ **IMPORTANT**: Your Supabase access token has full access to your projects!

- **Never commit tokens to git**
- Store in environment variables or secure config
- Rotate tokens regularly
- Use separate tokens for different environments

### Permissions

The MCP server has **full admin access** including:
- Reading all data (bypasses RLS)
- Modifying schema
- Deleting data
- Managing users

Only use in trusted development environments.

## Troubleshooting

### "Unable to connect to Supabase"

**Check**:
1. Token is valid (not expired)
2. Project ID is correct
3. MCP client restarted after config change

**Fix**: Generate new token and update config

### "Permission denied" errors

**Cause**: Token doesn't have sufficient permissions

**Fix**: 
1. Generate new token with full access
2. Ensure you're a project owner/admin

### MCP server not showing up

**Check**:
1. Config file location is correct
2. JSON syntax is valid (use JSONLint.com)
3. `npx` is available in PATH

**Fix**: Try running manually:
```bash
SUPABASE_ACCESS_TOKEN=your_token \
SUPABASE_PROJECT_ID=your_project \
npx @supabase/mcp-server@latest
```

### Rate limiting

Supabase has rate limits on API calls.

**Fix**: 
- Avoid rapid-fire queries
- Batch operations where possible
- Upgrade Supabase plan if needed

## Advanced: Local Development with MCP

For local Supabase development:

```json
{
  "mcpServers": {
    "supabase-local": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server@latest"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "your_token",
        "SUPABASE_PROJECT_ID": "local",
        "SUPABASE_API_URL": "http://localhost:54321"
      }
    }
  }
}
```

Requires running `supabase start` locally.

## Benefits for This Project

With MCP configured, you can:

1. **Quick Data Inspection**: "Show me all students in grade 10"
2. **Schema Evolution**: "Add a 'photo_url' column to students"
3. **Security Audits**: "Check for missing RLS policies"
4. **Type Safety**: "Generate updated TypeScript types"
5. **Debug Production**: "Show me auth errors from the last hour"
6. **Performance Tuning**: "Run performance advisories"

## Resources

- [Supabase MCP Documentation](https://github.com/supabase/mcp-server)
- [MCP Specification](https://modelcontextprotocol.io/)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)

---

**Ready to supercharge your Supabase development?** Set up MCP and experience the power of AI-assisted database management! 🚀
