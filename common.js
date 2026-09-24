$(document).ready(function () {


    const email = "yashp7962@gmail.com";
    const contact_no = "+918369655762";
    const location = "Mumbai,India-Maharashtra";


    const github_url = "https://github.com/goldstring";
    const linkedin_url = "https://www.linkedin.com/in/goldstring";
    const kaggle_url = "https://www.kaggle.com/yashparab";

    const resume_download_url = "https://goldstring.github.io/yashparab/resume/resume.pdf";

    $("#navbar").load("../yashparab/components/navbar.html", function () {
        console.log('Navbar Loaded');

        $('.email_link1').attr('href', 'mailto:' + email);
        $('.github_link').attr('href', github_url);
        $('.linkedin_link').attr('href', linkedin_url);
        $('.kaggle_link').attr('href', kaggle_url);
    });


    $("#contact_content").load("../yashparab/components/contact.html", function () {
        console.log('Contact Loaded');
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();

            var form = this;

            if (!form.checkValidity()) {
                e.stopPropagation();
                $(form).addClass('was-validated');
                return;
            }

            $(form).addClass('was-validated');

            var name = $('#cfName').val().trim();
            var email = $('#cfEmail').val().trim();
            var subject = $('#cfSubject').val().trim();
            var message = $('#cfMessage').val().trim();

            var whatsappMessage =
                '*New Contact Enquiry*%0A%0A' +
                '*Name:* ' + encodeURIComponent(name) + '%0A' +
                '*Email:* ' + encodeURIComponent(email) + '%0A' +
                '*Subject:* ' + encodeURIComponent(subject) + '%0A%0A' +
                '*Message:*%0A' + encodeURIComponent(message);

            var whatsappUrl = 'https://wa.me/' + contact_no.replace(/\D/g, '') + '?text=' + whatsappMessage;

            window.open(whatsappUrl, '_blank');

            $('#formStatus')
                .removeClass('d-none text-danger')
                .addClass('text-success')
                .text('Opening WhatsApp...');

            form.reset();
            $(form).removeClass('was-validated');
        });

        $('.email_link').html(email);
        $('.contact_link').html(contact_no);
        $('.location_link').html(location);
    });


    $("#footer_content").load("../yashparab/components/footer.html", function () {
        console.log('Footer Loaded');
        $('.email_link').html(email);
        $('.github_link').attr('href', github_url);
        $('.linkedin_link').attr('href', linkedin_url);
        $('.kaggle_link').attr('href', kaggle_url);
    });

    $(document).on("click", "#mobileMenu a:not(.dropdown-toggle)", function () {
        const mobileMenu = document.getElementById("mobileMenu");
        const offcanvas = bootstrap.Offcanvas.getInstance(mobileMenu);
        if (offcanvas) {
            offcanvas.hide();
        }
    });




    $('.email_link').html(email);
    $('.github_link').attr('href', github_url);
    $('.linkedin_link').attr('href', linkedin_url);
    $('.kaggle_link').attr('href', kaggle_url);

    $('.resume_link').attr('href', resume_download_url);

});


