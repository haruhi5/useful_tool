// Shared types and interfaces

export const TOOL_CATEGORIES = {
  GAME: 'game',
  UTILITY: 'utility',
  GUIDE: 'guide',
  CONVERTER: 'converter',
  CALCULATOR: 'calculator'
};

export const TOOL_STATUS = {
  ACTIVE: 'active',
  BETA: 'beta',
  COMING_SOON: 'coming_soon'
};

export class ToolConfig {
  constructor(id, name, category, description, status = 'active') {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.status = status;
  }
}
