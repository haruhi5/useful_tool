// API utilities
export const API_BASE = process.env.REACT_APP_API_URL || '/api';

export async function fetchTool(toolId) {
  const response = await fetch(`${API_BASE}/tools/${toolId}`);
  if (!response.ok) throw new Error(`Failed to fetch tool: ${toolId}`);
  return response.json();
}

export async function fetchAllTools() {
  const response = await fetch(`${API_BASE}/tools`);
  if (!response.ok) throw new Error('Failed to fetch tools');
  return response.json();
}

export async function postToolData(toolId, data) {
  const response = await fetch(`${API_BASE}/tools/${toolId}/data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`Failed to post data for tool: ${toolId}`);
  return response.json();
}
