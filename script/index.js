jQuery(document).ready(function($) {
    $("#gauge1").gauge(70, { color: "#ff4f81", unit: " %", type: "halfcircle" });
    $("#gauge2").gauge(20, { color: "#4d90fe", unit: " %", type: "halfcircle" });
    $("#gauge3").gauge(10, { color: "#2dde98", unit: " %", type: "halfcircle" });
    (function() {
        $.fatNav();
    }());
    $(window).load(function() {
        $('.flexslider').flexslider({
            animation: "slide",
            start: function(slider) {
                $('body').removeClass('loading');
            }
        });
    });
    // scrolling script
    $(".scroll").click(function(event) {
        event.preventDefault();
        $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 1000);
    });

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    $(".footer_passion").html("Made with Passion | " + monthNames[new Date().getMonth()] + " - " + new Date().getFullYear());
    $(".total_experience").html(new Date().getFullYear()-(2016));
});
//submit contact form data
function submitFormData() {
    //pending impl
}
