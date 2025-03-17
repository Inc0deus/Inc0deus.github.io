var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var button = document.getElementById("ban-button");
var info = document.getElementById("info-heading");
var filigrane = document.getElementById("filigrane");
var article_content = "";
function replaceAll(str, from, to) {
    return str.split(from).join(to);
}
function loadBannedWords() {
    return __awaiter(this, void 0, void 0, function () {
        var response, banned_words_data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("./assets/text/words-filtered.txt")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 2:
                    banned_words_data = _a.sent();
                    banned_words_data = replaceAll(banned_words_data, "\n", "|");
                    banned_words_data = replaceAll(banned_words_data, " ", "|");
                    return [2 /*return*/, banned_words_data];
            }
        });
    });
}
function setSpansCSS() {
    var elements = document.getElementsByClassName("banned");
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i];
        var score = parseFloat(e.getAttribute("data-score"));
        e.style.color = "rgba(255, ".concat(255 * (1 - score), ", ").concat(255 * (1 - score), ", 1)");
        e.onmouseover = function () {
            var this_e = this;
            var this_score = parseFloat(this_e.getAttribute("data-score"));
            console.log(this_e.textContent, 100 * this_score);
            this_e.style.backgroundColor = "rgba(255, 0, 0, ".concat(this_score, ")");
            this_e.style.color = "white";
        };
        e.onmouseout = function () {
            var this_e = this;
            var this_score = parseFloat(this_e.getAttribute("data-score"));
            this_e.style.backgroundColor = "rgba(0, 0, 0, 0)";
            this_e.style.color = "rgba(255, ".concat(255 * (1 - this_score), ", ").concat(255 * (1 - this_score), ", 1)");
        };
    }
}
function changeToDiv(text, score) {
    var _a;
    var article_input = document.getElementById("article-input");
    var display = document.createElement("p");
    display.innerHTML = text;
    display.id = "article-display";
    article_input.remove();
    (_a = document.getElementById("input")) === null || _a === void 0 ? void 0 : _a.appendChild(display);
    setSpansCSS();
    // score /= text.length;
    info.textContent = "Your score is ".concat(score, " \u2014 ");
    if (score == 0) {
        info.textContent += "you are good to publish";
    }
    else if (score < 300) {
        info.textContent += "let's just say it's a typo";
    }
    else {
        info.textContent += "we will not see you Nature";
        filigrane.textContent = "BANNED";
    }
    button.textContent = "TRY AGAIN";
}
function changeToTextarea(text) {
    var _a;
    var display = document.getElementById("article-display");
    var article_input = document.createElement("textarea");
    article_input.value = text;
    article_input.id = "article-input";
    display.remove();
    (_a = document.getElementById("input")) === null || _a === void 0 ? void 0 : _a.appendChild(article_input);
    setSpansCSS();
    info.textContent = "Enter a text and compute its score";
    filigrane.textContent = "";
    button.textContent = "COMPUTE SCORE";
}
function checkArticle() {
    return __awaiter(this, void 0, void 0, function () {
        var article_input, format, split_article, maxScore, fuse, banned_words, result, matches, t, total_score, i, idx, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    article_input = document.getElementById("article-input");
                    if (article_input == null)
                        return [2 /*return*/];
                    article_content = article_input.value;
                    format = replaceAll(article_content, "\n", "<br>");
                    split_article = format.split(" ");
                    maxScore = 0.19;
                    fuse = new window.Fuse(split_article, {
                        includeScore: true,
                        minMatchCharLength: 4,
                        threshold: maxScore,
                        findAllMatches: true,
                        useExtendedSearch: true,
                    });
                    return [4 /*yield*/, loadBannedWords()];
                case 1:
                    banned_words = _a.sent();
                    result = fuse.search(banned_words);
                    matches = [];
                    result.forEach(function (r) {
                        matches.push(r.refIndex);
                    });
                    t = "";
                    total_score = 0;
                    for (i = 0; i < split_article.length; i++) {
                        idx = matches.indexOf(i);
                        if (split_article[i].length >= 4 && idx > -1) {
                            score = 1 - result[idx].score / maxScore;
                            total_score += score;
                            t +=
                                "<span class=\"banned\" data-score=".concat(score, ">") +
                                    split_article[i] +
                                    "</span>";
                        }
                        else {
                            t += split_article[i];
                        }
                        t += " ";
                    }
                    changeToDiv(t, Math.round(total_score * 100));
                    return [2 /*return*/];
            }
        });
    });
}
var to_compute = true;
if (button != null) {
    button.onclick = function () {
        if (to_compute) {
            checkArticle();
            to_compute = false;
        }
        else {
            changeToTextarea(article_content);
            to_compute = true;
        }
    };
}
