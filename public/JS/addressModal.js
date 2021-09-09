let inputHolders = document.getElementsByClassName("input-holder");

for (let inputHolder of inputHolders) {
    inputHolder.getElementsByTagName("input").item(0).addEventListener("focusin", function () {
        if (inputHolder.children.length >= 3) {
            inputHolder.removeChild(inputHolder.children.item(inputHolder.children.length - 1));
        }
    })
}

document.getElementById("create-modal-close").addEventListener("click", function () {
    closeModal("createAddressModal");
})
document.getElementById("edit-modal-close").addEventListener("click", function () {
    closeModal("editAddressModal");
})
document.getElementById("create-input-name").addEventListener("focusout", function () {
    validateName(document.getElementById("create-input-name"));
});
document.getElementById("create-input-phone").addEventListener("focusout", function () {
    validatePhone(document.getElementById("create-input-phone"));
});
document.getElementById("create-input-address").addEventListener("focusout", function () {
    validateAddress(document.getElementById("create-input-address"));
});
document.getElementById("edit-input-name").addEventListener("focusout", function () {
    validateName(document.getElementById("edit-input-name"));
});
document.getElementById("edit-input-phone").addEventListener("focusout", function () {
    validatePhone(document.getElementById("edit-input-phone"));
});
document.getElementById("edit-input-address").addEventListener("focusout", function () {
    validateAddress(document.getElementById("edit-input-address"));
});
document.getElementById("create-input-city").addEventListener("focusout", function () {
    validateCity(document.getElementById("create-input-city"));
})
document.getElementById("edit-input-city").addEventListener("focusout", function () {
    validateCity(document.getElementById("edit-input-city"));
});

function validateName(nameEl) {
    let parent = nameEl.parentElement;
    let errorMessage = null;

    if (!isEmpty(nameEl.value)) {
        errorMessage = createInputErrorMessage();
        errorMessage.textContent = "This field is required."
    } else if (containsNumber(nameEl.value)) {
        errorMessage = createInputErrorMessage();
        errorMessage.textContent = "This field is shouldn't contain numbers."
    }

    appendErrorMessage(parent, errorMessage, nameEl);
}

function validatePhone(phoneEl) {
    let parent = phoneEl.parentElement;
    let errorMessage = null;

    if (!isEmpty(phoneEl.value)) {
        errorMessage = createInputErrorMessage();
        errorMessage.textContent = "This field is required."
    } else if (!containsNumber(phoneEl.value)) {
        errorMessage = createInputErrorMessage();
        errorMessage.textContent = "This field should contain only numbers."
    }

    appendErrorMessage(parent, errorMessage, phoneEl);
}

function validateAddress(addressEl) {
    let parent = addressEl.parentElement;
    let errorMessage = null;

    if (!isEmpty(addressEl.value)) {
        errorMessage = createInputErrorMessage();
        errorMessage.textContent = "This field is required."
    }

    appendErrorMessage(parent, errorMessage, addressEl);
}

function validateCity(cityEl) {
    let parent = cityEl.parentElement;
    let errorMessage = null;

    if (!isEmpty(cityEl.value)) {
        errorMessage = createInputErrorMessage();
        errorMessage.textContent = "This field is required.";
    }

    appendErrorMessage(parent, errorMessage, cityEl);
}

function validateAddressModal(modal) {
    let inputs = document.getElementById(modal).getElementsByTagName("input");
    let value = true;
    for (let input of inputs) {
        let e = document.createEvent('HTMLEvents');
        e.initEvent("focusout", false, true);
        input.dispatchEvent(e);
        if (input.getAttribute("valid") === "false") {
            value = false;
        }
    }

    return value;
}

function appendErrorMessage(parent, errorMessage, element) {
    if (errorMessage !== null) {
        if (parent.children.length < 3) {
            parent.appendChild(errorMessage);
        }
        element.setAttribute("valid", "false");
    } else {
        element.setAttribute("valid", "true");
    }
}

function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    let alertContainer = modal.getElementsByClassName("alert-container").item(0);
    for (let i = alertContainer.children.length - 1; i >= 0; i--) {
        alertContainer.removeChild(alertContainer.children.item(i));
    }
    let bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();
    let inputs = modal.getElementsByTagName("input");
    for (let input of inputs) {
        input.value = "";
    }
}

function displayErrorMessage(modalId, errorMessage) {
    let modal = document.getElementById(modalId);
    console.log(errorMessage);
    modal.getElementsByClassName("alert-container").item(0).appendChild(createErrorMessage(errorMessage));
}

function createErrorMessage(errorMessage) {
    let alert = document.createElement("div");
    alert.classList.add("alert", "alert-danger")
    alert.setAttribute("role", "alert");
    alert.textContent = errorMessage;

    return alert;
}

function addUserAddress(addressInfo) {
    console.log(addressInfo);
    $.post("../private/Includes/addAddress.php", {
        name: addressInfo["name"],
        phone: addressInfo["phone"],
        address: addressInfo["address"],
        city: addressInfo["city"],
        countryId: addressInfo["countryId"]
    }, function (data, status) {
        alert(data + " " + status);
        let response = JSON.parse(data);
        if (response["error"] !== null) {
            displayErrorMessage("createAddressModal", response["error"]);
        } else {
            // TODO: maybe move addAddress to be called even if the function is wrong
            addAddress(createAddressPageAddress(response["addressId"], addressInfo["name"], addressInfo["phone"]
                , addressInfo["address"], addressInfo["city"], addressInfo["country"]));
            closeModal("createAddressModal");
        }
    });
}

function editUserAddress(addressInfo, addressId) {
    console.log(addressId);
    $.post("../private/Includes/editAddress.php", {
        addressId: addressId,
        name: addressInfo["name"],
        phone: addressInfo["phone"],
        address: addressInfo["address"],
        city: addressInfo["city"],
        countryId: addressInfo["countryId"]
    }, function (data, status) {
        alert(data + " " + status);
        let response = JSON.parse(data);
        if (response["error"] !== null) {
            displayErrorMessage("editAddressModal", response["error"]);
        } else {
            updateAddressContent(getAddressModalValues("editAddressModal"), addressId);
            closeModal("editAddressModal");
        }
    });
}

function deleteUserAddress(addressId) {
    $.post("../private/Includes/deleteAddress.php", {
        addressId: addressId
    }, function (data, status) {
        alert(data + " " + status);
    })
}