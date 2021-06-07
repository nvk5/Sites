import intlTelInput from 'intl-tel-input';

export default function () {
    const input = document.querySelector("#phone");

    const iti = intlTelInput(input, {
        initialCountry: 'RU',
        preferredCountries: ['ru', 'ua', 'by'],
        utilsScript: "../../node_modules/intl-tel-input/build/js/utils.js",
        separateDialCode: true,
        customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
            const country = selectedCountryData.iso2;

            if (country === 'ru') {
                return `+${selectedCountryData.dialCode} (123) 456 78-90`;
            }
            return `+${selectedCountryData.dialCode} ${selectedCountryPlaceholder}`;
        },
    });


    const iso = document.querySelector('.iti__selected-dial-code');
    const setIso = () => iso.textContent = iti.getSelectedCountryData().iso2;
    setIso();

    input.addEventListener("countrychange", setIso);
}
