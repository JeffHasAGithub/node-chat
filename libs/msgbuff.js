const _msg = function(user, text) {
  // get: get property $prop
  // returns null on error
  function get(prop) {
    const lprop = prop.toLowerCase();

    let copy = null;
    switch (lprop) {
      case "user":
        copy = user;
        break;
      case "text":
          copy = text;
          break;
      default:
        copy = { user, text };
        break;
    }

    return copy;
  }

  // set: set property $prop to value $val
  // returns null on error
  function set(prop, val) {
    const lprop = prop.toLowerCase();

    switch (lprop) {
      case "user":
        user = val;
        break;
      case "text":
        text = val;
        break;
      default:
        return null;
    }

    return val;
  }

  return { get, set };
};

const _msgbuff = function(max) {
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
      case "msg":
        if (Number.isinteger(i))
          if (i < buffer.length)
            copy = buffer[i].get('text');
        break;
      case "msgs":
        copy = buffer.map((msg) => msg.get('text'));
        break;
      default:
        break;
    }

    return copy;
  }

  function add(user, msgs) {
    if (!Array.isArray(msgs))
      return false;

    msgs.forEach((msg) => {
      if (buffer.length >= max)
        buffer.shift();

      buffer.push(_msg(user, msg));
    });
  }

  function clear() {
    buffer = []; 
  }

  return { add, get, clear };
};

const msgbuff = function(max) {
  return _msgbuff(max);
} 

module.exports = msgbuff;

///////////////////////////////////