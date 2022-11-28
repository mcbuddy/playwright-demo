// playwright.config.ts
import type { PlaywrightTestConfig } from '@playwright/test';
import { env } from 'process';

var is_headless = false
if(env.HEADLESS == 'true') {
    is_headless  = true
}

const config: PlaywrightTestConfig = { 
    timeout: 60 * 1000, // Setup timeout to 5 minutes. 
    use: {    
        headless: is_headless, // Turn off headless mode.  
    },
};

export default config;
