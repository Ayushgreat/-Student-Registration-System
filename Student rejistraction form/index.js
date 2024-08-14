function validateForm() {
    // Validate Full Name (only letters)
    var name = document.getElementById("name").value;
    var namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
        alert("Please enter a valid name (letters only).");
        return false;
    }

    // Validate Student ID (only numbers)
    var studentID = document.getElementById("studentID").value;
    if (isNaN(studentID) || studentID <= 0) {
        alert("Please enter a valid Student ID (positive numbers only).");
        return false;
    }

    // Validate Email (format)
    var email = document.getElementById("email").value;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validate Phone Number (only numbers)
    var phn = document.getElementById("phn").value;
    if (isNaN(phn) || phn.length < 10) {
        alert("Please enter a valid phone number (at least 10 digits).");
        return false;
    }

    return true;
}

function fun() {
    if (validateForm()) {
        var n = $("#name").val();
        var studentID = $("#studentID").val();
        var e = $("#email").val();
        var p = $("#phn").val();
        var ph = $("#photo").val();
        var g = $('input[name="gender"]:checked').val();
        var selected = [];
        $("input[type=checkbox]:checked").each(function () {
            selected.push(this.value);
        });

        if (n && studentID && e && p && ph && g) {
            var studentRecord = `
                <div class="s1">
                    <table>
                        <tr>
                            <td>
                                <p class="p"><strong>Name</strong>: ${n}</p>
                                <p class="p"><strong>Student ID</strong>: ${studentID}</p>
                                <p class="p"><strong>Email</strong>: ${e}</p>
                                <p class="p"><strong>Phone</strong>: ${p}</p>
                                <p class="p"><strong>Gender</strong>: ${g}</p>
                                <p class="p"><strong>Skills</strong>: ${selected.join(', ')}</p>
                            </td>
                            <td>
                                <img src="${ph}" alt="Student Photo">
                            </td>
                            <td>
                                <button class="edit-button">Edit</button>
                                <button class="delete-button">Delete</button>
                            </td>
                        </tr>
                    </table>
                </div>
            `;
            
            $('#ss').append(studentRecord);
            $("#fo").trigger("reset");

            // Attach delete event to the delete button
            $(".delete-button").last().on("click", function() {
                $(this).closest(".s1").remove();
            });

            // Attach edit event to the edit button
            $(".edit-button").last().on("click", function() {
                var record = $(this).closest(".s1");
                $("#name").val(record.find("p:contains('Name')").text().replace('Name: ', ''));
                $("#studentID").val(record.find("p:contains('Student ID')").text().replace('Student ID: ', ''));
                $("#email").val(record.find("p:contains('Email')").text().replace('Email: ', ''));
                $("#phn").val(record.find("p:contains('Phone')").text().replace('Phone: ', ''));
                $("#photo").val(record.find("img").attr("src"));
                var gender = record.find("p:contains('Gender')").text().replace('Gender: ', '');
                $("input[name='gender'][value='" + gender + "']").prop('checked', true);
                var skills = record.find("p:contains('Skills')").text().replace('Skills: ', '').split(', ');
                $("input[type=checkbox]").prop('checked', false);
                skills.forEach(function(skill) {
                    $("input[type=checkbox][value='" + skill + "']").prop('checked', true);
                });

                // Remove the old record
                record.remove();
            });
        } else {
            alert("All fields are required!");
        }
    }
}

