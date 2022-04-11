const _user = function(id, name) {
  // get: get property $prop
  // returns null if $prop not found
  function get(prop) {
    const lprop = prop.toLowerCase();

    let copy = null;
    switch (lprop) {
      case "id":
        copy = id;
        break;
      case "name":
        copy = name;
        break;
      case "all":
        copy = { id, name };
        break;
      default:
        break;
    }

    return copy;
  }

  // set: set property $prop to value $val
  // returns null if $prop not found
  function set(prop, val) {
    const lprop = prop.toLowerCase();

    switch (lprop) {
      case "id":
        id = val;
        break;
      case "name":
        name = val;
        break;
      default:
        return null;
    }

    return val;
  }

  return { get, set };
};

const _userbuff = function(max) {
  let buffer = []; 

  function get(prop, i) {
    const lprop = prop.toLowerCase();

    let copy = null;
    switch (lprop) {
      case "length":
        copy = buffer.length;
        break;
      case "max":
        copy = max;
        break;
      case "user":
        if (Number.isInteger(i))
          if (i < buffer.length)
            copy = buffer[i];
        break; 
      case "users":
        copy = buffer.map((usr) => usr.get('all'));
        break;
      default:
        break;
    }

    return copy;
  }

  function add(users) {
    if (!Array.isArray(users))
      return false;

    users.forEach((user) => {
      if (buffer.length >= max)
				return;

      buffer.push(_user(user.id, user.name));
    });

    return buffer.length;
  }

  function del(id) {
    buffer = buffer.filter((usr) => usr.get("id") != id);

    return buffer.length;
  }

  function clear() {
    buffer = []; 
  }

  return { add, del, get, clear };
}

const Userbuff = function(max) {
  return _userbuff(max);
}

module.exports = Userbuff;
