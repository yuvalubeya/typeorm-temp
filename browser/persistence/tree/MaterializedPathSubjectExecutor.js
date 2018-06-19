var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Executes subject operations for materialized-path tree entities.
 */
var MaterializedPathSubjectExecutor = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function MaterializedPathSubjectExecutor(queryRunner) {
        this.queryRunner = queryRunner;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Executes operations when subject is being inserted.
     */
    MaterializedPathSubjectExecutor.prototype.insert = function (subject) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, parent, parentId, parentPath, insertedEntityId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parent = subject.metadata.treeParentRelation.getEntityValue(subject.entity);
                        if (!parent && subject.parentSubject && subject.parentSubject.entity) // if entity was attached via children
                            parent = subject.parentSubject.insertedValueSet ? subject.parentSubject.insertedValueSet : subject.parentSubject.entity;
                        parentId = subject.metadata.getEntityIdMap(parent);
                        parentPath = "";
                        if (!parentId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.queryRunner.manager
                                .createQueryBuilder()
                                .select(subject.metadata.targetName + "." + subject.metadata.materializedPathColumn.propertyPath, "path")
                                .from(subject.metadata.target, subject.metadata.targetName)
                                .whereInIds(parentId)
                                .getRawOne()
                                .then(function (result) { return result ? result["path"] : undefined; })];
                    case 1:
                        parentPath = _b.sent();
                        _b.label = 2;
                    case 2:
                        insertedEntityId = subject.metadata.treeParentRelation.joinColumns.map(function (joinColumn) {
                            return joinColumn.referencedColumn.getEntityValue(subject.insertedValueSet);
                        }).join("_");
                        return [4 /*yield*/, this.queryRunner.manager
                                .createQueryBuilder()
                                .update(subject.metadata.target)
                                .set((_a = {},
                                _a[subject.metadata.materializedPathColumn.propertyPath] = parentPath + insertedEntityId + ".",
                                _a))
                                .where(subject.identifier)
                                .execute()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MaterializedPathSubjectExecutor;
}());
export { MaterializedPathSubjectExecutor };

//# sourceMappingURL=MaterializedPathSubjectExecutor.js.map
