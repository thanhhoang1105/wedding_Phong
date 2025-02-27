const music = document.getElementById("wedding-music");
const musicIcon = document.getElementById("music-icon");

function toggleMusic() {
    const audio = document.getElementById("wedding-music");
    const musicIcon = document.getElementById("music-icon");
    const musicLabel = document.querySelector(".music-label");

    if (audio.paused) {
        audio.play();
        musicIcon.classList.remove("fa-play");
        musicIcon.classList.add("fa-pause");
        musicLabel.style.display = "none";
    } else {
        audio.pause();
        musicIcon.classList.remove("fa-pause");
        musicIcon.classList.add("fa-play");
        musicLabel.style.display = "block";
    }
}

// Cập nhật ngày cưới (sửa theo nhu cầu)
const weddingDate = new Date("2025-04-05T11:00:00").getTime();

const Countdown = {
    $timer: $(".countdown-section__timer"),
    countdownInterval: null,
    totalSeconds: 0,

    init() {
        const now = new Date().getTime();
        this.totalSeconds = Math.floor((weddingDate - now) / 1000);

        // Tính giá trị ban đầu
        this.values = {
            days:
                this.totalSeconds >= 86400
                    ? Math.floor(this.totalSeconds / 86400)
                    : 0,
            hours:
                this.totalSeconds >= 3600
                    ? Math.floor((this.totalSeconds % 86400) / 3600)
                    : 0,
            minutes: Math.floor((this.totalSeconds % 3600) / 60),
            seconds: this.totalSeconds % 60,
        };

        // Lưu DOM cho từng đơn vị (mỗi đơn vị có 2 figure)
        this.$ = {
            days: this.$timer.find(
                ".countdown-section__unit--days .countdown-section__digit"
            ),
            hours: this.$timer.find(
                ".countdown-section__unit--hours .countdown-section__digit"
            ),
            minutes: this.$timer.find(
                ".countdown-section__unit--minutes .countdown-section__digit"
            ),
            seconds: this.$timer.find(
                ".countdown-section__unit--seconds .countdown-section__digit"
            ),
        };

        // Set giá trị ban đầu cho từng đơn vị
        this.setInitialDigits(this.values.days, this.$.days);
        this.setInitialDigits(this.values.hours, this.$.hours);
        this.setInitialDigits(this.values.minutes, this.$.minutes);
        this.setInitialDigits(this.values.seconds, this.$.seconds);

        // Bắt đầu đếm ngược
        this.count();
    },

    setInitialDigits(value, $figures) {
        const str = value < 10 ? "0" + value : value.toString();
        // Figure đầu tiên
        $figures
            .eq(0)
            .find(".countdown-section__digit-top")
            .html(str.charAt(0));
        $figures
            .eq(0)
            .find(".countdown-section__digit-top-back span")
            .html(str.charAt(0));
        $figures
            .eq(0)
            .find(".countdown-section__digit-bottom")
            .html(str.charAt(0));
        $figures
            .eq(0)
            .find(".countdown-section__digit-bottom-back span")
            .html(str.charAt(0));
        // Figure thứ hai
        $figures
            .eq(1)
            .find(".countdown-section__digit-top")
            .html(str.charAt(1));
        $figures
            .eq(1)
            .find(".countdown-section__digit-top-back span")
            .html(str.charAt(1));
        $figures
            .eq(1)
            .find(".countdown-section__digit-bottom")
            .html(str.charAt(1));
        $figures
            .eq(1)
            .find(".countdown-section__digit-bottom-back span")
            .html(str.charAt(1));
    },

    count() {
        const that = this;
        // Lưu các figure riêng lẻ cho từng đơn vị
        const $day1 = this.$.days.eq(0),
            $day2 = this.$.days.eq(1);
        const $hour1 = this.$.hours.eq(0),
            $hour2 = this.$.hours.eq(1);
        const $min1 = this.$.minutes.eq(0),
            $min2 = this.$.minutes.eq(1);
        const $sec1 = this.$.seconds.eq(0),
            $sec2 = this.$.seconds.eq(1);

        this.countdownInterval = setInterval(() => {
            if (that.totalSeconds > 0) {
                that.totalSeconds--;
                that.values.days = Math.floor(that.totalSeconds / 86400);
                that.values.hours = Math.floor(
                    (that.totalSeconds % 86400) / 3600
                );
                that.values.minutes = Math.floor(
                    (that.totalSeconds % 3600) / 60
                );
                that.values.seconds = that.totalSeconds % 60;

                that.checkDigit(that.values.days, $day1, $day2);
                that.checkDigit(that.values.hours, $hour1, $hour2);
                that.checkDigit(that.values.minutes, $min1, $min2);
                that.checkDigit(that.values.seconds, $sec1, $sec2);
            } else {
                clearInterval(that.countdownInterval);
            }
        }, 1000);
    },

    animateFigure($el, value) {
        // Cập nhật giá trị cho phần back
        $el.find(".countdown-section__digit-top-back span").html(value);
        $el.find(".countdown-section__digit-bottom-back span").html(value);

        TweenMax.to($el.find(".countdown-section__digit-top"), 0.8, {
            rotationX: "-180deg",
            transformPerspective: 300,
            ease: Quart.easeOut,
            onComplete: function () {
                $el.find(".countdown-section__digit-top").html(value);
                $el.find(".countdown-section__digit-bottom").html(value);
                TweenMax.set($el.find(".countdown-section__digit-top"), {
                    rotationX: 0,
                });
            },
        });

        TweenMax.to($el.find(".countdown-section__digit-top-back"), 0.8, {
            rotationX: 0,
            transformPerspective: 300,
            ease: Quart.easeOut,
            clearProps: "all",
        });
    },

    checkDigit(value, $el1, $el2) {
        const str = value < 10 ? "0" + value : value.toString();
        const digit1 = str.charAt(0);
        const digit2 = str.charAt(1);
        const current1 = $el1.find(".countdown-section__digit-top").html();
        const current2 = $el2.find(".countdown-section__digit-top").html();

        if (current1 !== digit1) {
            this.animateFigure($el1, digit1);
        }
        if (current2 !== digit2) {
            this.animateFigure($el2, digit2);
        }
    },
};

Countdown.init();
