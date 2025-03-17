var button = document.getElementById("ban-button") as HTMLInputElement;
var info = document.getElementById("info-heading") as HTMLHeadingElement;
var filigrane = document.getElementById("filigrane") as HTMLHeadingElement;
var article_content = "";

function replaceAll(str: string, from: string, to: string) {
    return str.split(from).join(to);
}

async function loadBannedWords() {
    var response = await fetch("./assets/text/words-filtered.txt");
    var banned_words_data = await response.text();
    banned_words_data = replaceAll(banned_words_data, "\n", "|");
    banned_words_data = replaceAll(banned_words_data, " ", "|");
    return banned_words_data;
}

function setSpansCSS() {
    var elements = document.getElementsByClassName("banned");
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i] as HTMLSpanElement;
        var score = parseFloat(e.getAttribute("data-score") as string);
        e.style.color = `rgba(255, ${255 * (1 - score)}, ${
            255 * (1 - score)
        }, 1)`;

        e.onmouseover = function () {
            var this_e = this as HTMLSpanElement;
            var this_score = parseFloat(
                this_e.getAttribute("data-score") as string
            );
            console.log(this_e.textContent, 100 * this_score);
            this_e.style.backgroundColor = `rgba(255, 0, 0, ${this_score})`;
            this_e.style.color = "white";
        };

        e.onmouseout = function () {
            var this_e = this as HTMLSpanElement;
            var this_score = parseFloat(
                this_e.getAttribute("data-score") as string
            );
            this_e.style.backgroundColor = `rgba(0, 0, 0, 0)`;
            this_e.style.color = `rgba(255, ${255 * (1 - this_score)}, ${
                255 * (1 - this_score)
            }, 1)`;
        };
    }
}

function changeToDiv(text: string, score: number) {
    var article_input = document.getElementById(
        "article-input"
    ) as HTMLTextAreaElement;

    var display = document.createElement("p");
    display.innerHTML = text;
    display.id = "article-display";

    article_input.remove();
    document.getElementById("input")?.appendChild(display);
    setSpansCSS();

    // score /= text.length;
    info.textContent = `Your score is ${score} — `;
    if (score == 0) {
        info.textContent += "you are good to publish";
    } else if (score < 300) {
        info.textContent += "let's just say it's a typo";
    } else {
        info.textContent += "we will not see you Nature";
        filigrane.textContent = "BANNED";
    }

    button.textContent = "TRY AGAIN";
}

function changeToTextarea(text: string) {
    var display = document.getElementById(
        "article-display"
    ) as HTMLTextAreaElement;

    var article_input = document.createElement("textarea");
    article_input.value = text;
    article_input.id = "article-input";

    display.remove();
    document.getElementById("input")?.appendChild(article_input);
    setSpansCSS();

    info.textContent = "Enter a text and compute its score";
    filigrane.textContent = "";

    button.textContent = "COMPUTE SCORE";
}

async function checkArticle() {
    var article_input = document.getElementById(
        "article-input"
    ) as HTMLTextAreaElement | null;

    if (article_input == null) return;

    article_content = article_input.value;
    var format = replaceAll(article_content, "\n", "<br>");
    var split_article = format.split(" ");

    var maxScore = 0.19;
    var fuse = new window.Fuse(split_article, {
        includeScore: true,
        minMatchCharLength: 4,
        threshold: maxScore,
        findAllMatches: true,
        useExtendedSearch: true,
    });

    var banned_words = await loadBannedWords();

    var result = fuse.search(banned_words);

    var matches: number[] = [];

    result.forEach((r) => {
        matches.push(r.refIndex);
    });

    var t = "";

    var total_score = 0;
    for (var i = 0; i < split_article.length; i++) {
        var idx = matches.indexOf(i);
        if (split_article[i].length >= 4 && idx > -1) {
            var score = 1 - (result[idx].score as number) / maxScore;
            total_score += score;
            t +=
                `<span class="banned" data-score=${score}>` +
                split_article[i] +
                "</span>";
        } else {
            t += split_article[i];
        }
        t += " ";
    }

    changeToDiv(t, Math.round(total_score * 100));
}

var to_compute = true;
if (button != null) {
    button.onclick = function () {
        if (to_compute) {
            checkArticle();
            to_compute = false;
        } else {
            changeToTextarea(article_content);
            to_compute = true;
        }
    };
}
