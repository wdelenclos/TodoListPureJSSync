
const db = "http://localhost:3000/tasks/";

function initLocal(){
    window.localdb = new PouchDB('todo');
}

function localGet(callback){
    window.localdb.allDocs({include_docs: true}).then(function (result) {
        callback(result.rows)
    }).catch(function (err) {
        console.log(err);
    });
}

function localAdd(obj){
    window.localdb.put(obj);
}

function localRemove(id){
    window.localdb.get(id).then(function(doc) {
        doc._deleted = true;
        return  window.localdb.put(doc);
    }).then(function (result) {
        // handle result
    }).catch(function (err) {
        console.log(err);
    });
}

function localUpdateStatus(id, data){
    window.localdb.get(id).then(function(doc) {
        return window.localdb.put({
            _id: id,
            _rev: doc._rev,
            name: doc.name,
            ...data
        });
    }).then(function(response) {
        // handle response
    }).catch(function (err) {
        console.log(err);
    });
}

function localUpdateName(id, data){
    window.localdb.get(id).then(function(doc) {
        return window.localdb.put({
            _id: id.toString(),
            _rev: doc._rev,
            name: data,
            status: doc.status,
        });
    }).then(function(response) {
        // handle response
    }).catch(function (err) {
        console.log(err);
    });
}

function distantAdd(el, callback) {
    fetch(db, {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({el})
    }).then(
        response => response.json()
    ).then(
        data => callback(data)
    )
}

function distantUpdate(el, callback) {
}

function distantRemove(id, callback) {
    fetch( db + id, {
        method: 'DELETE'
    }).then(
        response => response.json()
    ).then(
        data => callback(data)
    );
}

function distantGet(callback) {
    fetch(db)
        .then(response => response.json())
        .then(data => callback(data));
}

export {initLocal, localGet, localAdd, localRemove, localUpdateStatus,localUpdateName, distantAdd, distantUpdate, distantRemove, distantGet}


