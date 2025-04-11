function setCookie(e, t, a) {
    var r = new Date,
        r = (r.setTime(r.getTime() + 18e5), "expires=" + r.toString());
    document.cookie = e + "=" + t + ";" + r + ";path=/"
}

function getCookie(e) {
    for (var t = e + "=", a = decodeURIComponent(document.cookie).split(";"), r = 0; r < a.length; r++) {
        for (var s = a[r];
            " " == s.charAt(0);) s = s.substring(1);
        if (0 == s.indexOf(t)) return s.substring(t.length, s.length)
    }
    return ""
}

function deleteCookie(e) {
    var t = new Date,
        t = (t.setTime(t.getTime() + 1), "expires=" + t.toString());
    document.cookie = e + "=1;" + t + ";path=/"
}

function contactForm() {
    var r;
    window.verifyRecaptchaCallback = function(e) {
        $("input[data-recaptcha]").val(e).trigger("change")
    }, window.expiredRecaptchaCallback = function() {
        $("input[data-recaptcha]").val("").trigger("change")
    }, $(".dzForm").on("submit", function(e) {
        e.preventDefault(), $(".dzFormMsg").html('<div class="gen alert dz-alert alert-success">Submitting..</div>');
        var e = $(this).attr("action"),
            t = $(this).serialize();
        $.ajax({
            method: "POST",
            url: e,
            data: t,
            dataType: "json",
            success: function(e) {
                1 == e.status && (r = '<div class="gen alert dz-alert alert-success">' + e.msg + "</div>"), 0 == e.status && (r = '<div class="err alert dz-alert alert-danger">' + e.msg + "</div>"), $(".dzFormMsg").html(r), setTimeout(function() {
                    $(".dzFormMsg .alert").hide(1e3)
                }, 5e3), $(".dzForm")[0].reset(), grecaptcha.reset()
            }
        })
    }), $(document).on("submit", ".dzSubscribe", function(e) {
        e.preventDefault();
        var t = $(this),
            e = t.attr("action"),
            a = t.serialize();
        t.addClass("dz-ajax-overlay"), $.ajax({
            method: "POST",
            url: e,
            data: a,
            dataType: "json",
            success: function(e) {
                t.removeClass("dz-ajax-overlay"), 1 == e.status && (r = '<div class="gen alert dz-alert alert-success">' + e.msg + "</div>", setCookie("prevent_subscription", "true", 1)), 0 == e.status && (r = '<div class="err alert dz-alert alert-danger">' + e.msg + "</div>"), $(".dzSubscribeMsg").html(r), setTimeout(function() {
                    $(".dzSubscribeMsg .alert").hide(0)
                }, 5e3), $(".dzSubscribe")[0].reset()
            }
        })
    })
}
jQuery(document).ready(function() {
    "use strict";
    contactForm()
});