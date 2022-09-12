let bigOak = {
  name: "Big Oak",
  neighbors: ["Cow Pasture", "Butcher Shop", "Gilles' Garden"],
  state: { gossip: [], connections: Map() },
};

class Timeout extends Error {}

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (failed, value) => {
        done = true;
        if (failed) {
          reject(failed);
        } else {
          resolve(value);
        }
      });
      setTimeout(() => {
        if (done) return;
        else if (n < 3) {
          attempt(n + 1);
        } else {
          reject(new Timeout("Timed out"));
        }
      }, 250);
    }
    attempt(1);
  });
}

function requestType(name, handler) {
  defineRequestType(name, (nest, content, source, callback) => {
    try {
      Promise.resolve(handler(nest, content, source)).then((response) =>
        callback(null, response)
      ),
        (failure) => callback(failure);
    } catch (exception) {
      callback(exception);
    }
  });
}

function findRoute(from, to, connections) {
  let work = [{ at: from, via: null }];
  for (let i = 0; i < work.length; i++) {
    let { at, via } = work[i];
    for (let next of connections.get(at) || []) {
      if (next === to) {
        return via;
      }
      if (!work.some((w) => w.at === next)) {
        work.push({ at: next, via: via || next });
      }
    }
  }
  return null;
}

function routeRequest(nest, target, type, content) {
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content);
  } else {
    let via = findRoute(nest.name, target, nest.state.connections);
    if (!via) throw new Error(`No route to ${target}`);
    return request(nest, via, "route", { target, type, content });
  }
}

function storage(nest, name) {
  return new Promise((resolve) => {
    nest.readStorage(name, (result) => resolve(result));
  });
}

requestType("route", (nest, { target, type, content }) => {
  return routeRequest(nest, target, type, content);
});

requestType("storage", (nest, name) => storage(nest, name));

//routeRequest(bigOak, "Church Tower", "note", "Incoming jackdaws!");

function anyStorage(nest, source, name) {
  if (source === nest.name) {
    return storage(nest, name);
  } else {
    return routeRequest(nest, source, "storage", name);
  }
}

// Tracking the scalpel (needs to be run in the
// online test environment for this question, NOT from this script)
async function locateScalpel(nest) {
  // Your code here.
  let returnedLocation = "";
  let currOutcome = await anyStorage(nest, nest.name, "scalpel");
  while (currOutcome !== returnedLocation) {
    returnedLocation = currOutcome;
    currOutcome = await anyStorage(nest, returnedLocation, "scalpel");
  }
  //console.log(currOutcome);
  return currOutcome;
}

function locateScalpel2(nest) {
  // Your code here.
  function checkStorage(current) {
    return anyStorage(nest, current, "scalpel").then((value) => {
      if (value != current) {
        console.log("in recursion");
        return checkStorage(value);
      } else {
        return current;
      }
    });
  }
  return checkStorage(nest.name);
}
locateScalpel(bigOak).then(console.log);
locateScalpel2(bigOak).then(console.log);
// → Butcher Shop
