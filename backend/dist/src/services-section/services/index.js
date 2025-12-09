"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.example_extended_services_list_result = exports.example_extended_service = exports.example_service = void 0;
__exportStar(require("./module"), exports);
__exportStar(require("./dto"), exports);
var example_data_1 = require("./example.data");
Object.defineProperty(exports, "example_service", { enumerable: true, get: function () { return example_data_1.example_service; } });
Object.defineProperty(exports, "example_extended_service", { enumerable: true, get: function () { return example_data_1.example_extended_service; } });
Object.defineProperty(exports, "example_extended_services_list_result", { enumerable: true, get: function () { return example_data_1.example_extended_services_list_result; } });
//# sourceMappingURL=index.js.map