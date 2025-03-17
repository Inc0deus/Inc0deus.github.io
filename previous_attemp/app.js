function buttonTest() {
    alert("Hello, World!")
}

function setVarMessage(id, msg_name, msg) {
    let elem = document.querySelector(`#${id}`)
    elem.innerText = elem.innerHTML.replace(`#${msg_name}#`, msg)
}

class DateClass {
    constructor(d, m, y) {
        this.day = d
        this.month = m
        this.year = y
    }

    countLeapYears() {
        let y = this.year
        if (this.month <= 2) y-=1
        return Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400)
    }

    // https://en.wikipedia.org/wiki/Julian_day
    toJulian() {
        let a = Math.floor(this.year/100)
        let b = Math.floor(a/4)
        let c = 2 - a + b
        let d = 365.25 * (this.year + 4716)
        let e = 30.6001 * (this.month + 1)
        return c + d + e + this.day - 1524.5
    }

    // TODO: fix (too approximative ± 2d)
    static daysBetween(date1, date2) {
        return Math.floor(Math.abs(date1.toJulian()-date2.toJulian()))
    }

    // return a duration from day to day/month(31d)/year(365d)
    static daysToDate(days) {
        let d = days
        let y = Math.floor(d/365)
        d -= y*365
        let m = Math.floor(d/31)
        d -= m*31
        return new DateClass(d, m, y)
    }

    toString() {
        return `${this.day}/${this.month}/${this.year}`
    }
}

function setup() {
    // age calculation
    let d = new Date()
    let date = new DateClass(d.getDay(), d.getMonth(), d.getFullYear())
    let birth = new DateClass(26, 9, 2004)
    let dur = DateClass.daysBetween(date, birth)
    setVarMessage("age_message", "age", DateClass.daysToDate(dur).year)

    alert("You've been hacked")
}

window.onload = setup
