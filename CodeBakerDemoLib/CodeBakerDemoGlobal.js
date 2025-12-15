// CodeBakerDemo-global.js
import * as Lib from "./CodeBakerDemo.js";  // import everything from your library

// Attach each exported class to window
Object.keys(Lib).forEach(key => {
    window[key] = Lib[key];
});
