// playwright.config.ts
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = { 
    timeout: 60 * 1000, // Setup timeout to 5 minutes. 
    use: {    
        headless: false, // Turn off headless mode.  
    },
};

export default config;
