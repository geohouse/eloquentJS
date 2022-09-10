// retry

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  let output = 0;
  for (;;) {
    try {
      output = primitiveMultiply(a, b);
      console.log(`output is: ${output}`);
      break;
    } catch (error) {
      if (error instanceof MultiplicatorUnitFailure) {
        console.log(`${error}. Re-trying`);
      } else {
        throw error;
      }
    }
  }
  return output;
}

console.log(reliableMultiply(10, 5));

// locked box

const box = {
  locked: true,
  unlock() {
    this.locked = false;
    console.log("unlocked");
  },
  lock() {
    this.locked = true;
    console.log("locked");
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  },
};

function withBoxUnlocked(body) {
  if (!box.locked) {
    try {
      return body();
    } catch (error) {
      console.error(error);
    }
  } else {
    box.unlock();
    try {
      return body();
    } catch (error) {
      console.error(error);
    } finally {
      box.lock();
    }
  }
}

withBoxUnlocked(function () {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function () {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (error) {
  console.log(`Error raised: ${error}`);
}
console.log(box.locked);
