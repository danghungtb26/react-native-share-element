/* hell on earth --> */ export default {
  email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.+$/,
  password: /^(?=.*[a-zA-Z])(?=.*[0-9])[^\s\n\0]{6,}$/,
  phone: /^[0-9]{8,12}$/,
  username: /^[a-zA-Z][a-zA-Z0-9]{6,}$/,
  fullname: /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{1,}\'?\-?\s*){4,35}$/,
}

export const textToPascal = text => {
  text = text.split(' ').map(word => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase()
  })
  return text.join(' ')
}

export const trim = text => {
  return text.replace(/\s*$/, '').replace(/(\s){2,}/g, ' ')
}

export const processName = name => {
  name = trim(name)
  name = textToPascal(name)
  return name
}
