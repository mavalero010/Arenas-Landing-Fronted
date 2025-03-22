export enum AdminAccessLevel {
    // Regular admins (read-only, minimal functionality)
    VIEWER = 1,
    
    // Regular admins with basic write access
    BASIC = 5,
    
    // Manager level with more privileges
    MANAGER = 10,
    
    // High level manager
    SENIOR_MANAGER = 15,
    
    // Super admin (full access)
    SUPER_ADMIN = 20
  } 