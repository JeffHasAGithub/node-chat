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
        copy = buffer;
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
        buffer.shift();

      buffer.push(user);
    });

    return buffer.length - 1;
  }

  function clear() {
    buffer = []; 
  }

  return { add, get, clear };
}

const userbuff = function(max) {
  return _userbuff(max);
}
