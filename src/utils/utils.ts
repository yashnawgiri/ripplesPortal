// TODO: Replace all any
export function toCamelCase(str: any) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word: any, index: any) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, "");
}

const validateEmail = (email: any) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function isValidUrl(string: any) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export function checkValueByType(dataType: any, value: any) {
  switch (dataType) {
    case "phoneNumber":
      return ((value.match("[0-9]{10}") != null));
    case "email" :
      return (validateEmail(value) != null);
    case "companyWebsiteUrl":
      return isValidUrl(value);
    default:
      return value.length > 0;

  }

}
