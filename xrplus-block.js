wp.blocks.registerBlockType('xrplus/custom-block', {
    title: 'XR+ project',
    icon: 'no-alt',
    category: 'design',
    attributes: {
        userID: {type: 'string'},
        projectURL: {type: 'string'},
        projectName: {type: 'string'},
        projectCover: {type: 'string'}
    },
    edit: function(props){

        function updateUserID(e) { props.setAttributes({userID: e.target.value}) }

        function updateProjectURL(e) { 
            let url = e.target.value
            let fetchURL = `https://xr-git.plus/embed/get/project.php?userID=${props.attributes.userID}&projectURL=${url}`;

            props.setAttributes({projectURL: url}) 

            if(url.length === 3){
                fetch(fetchURL)
                .then(function (response) {
                    if (response.status !== 200) {
                        alert("something went wrong - error");
                        return null;
                    }
                    return response.json();
                })
                .then(function (data) {

                    props.setAttributes({projectName: data.name})
                    props.setAttributes({projectCover: data.cover})

                    console.log("json data:");
                    console.log(data)

                    if (data.error)
                    {
                        alert("error");
                        throw ("error 5978");
                    }

                    //ici faire qque avec la data
                    // Ici, vous pouvez mettre à jour l'image de manière synchrone
                    const imgElement = document.createElement("img");
                    imgElement.src = props.attributes.projectCover;
                    imgElement.alt = props.attributes.projectName;
                    imgElement.className = "xrCover";

                    // Remplacez l'ancien contenu par la nouvelle image
                    const imageContainer = document.getElementById("image-container");
                    imageContainer.innerHTML = "";
                    imageContainer.appendChild(imgElement);

                })
                .catch(function (error) {
                    console.error("Error:", error);
                });
            }
        }
        

        return React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("label", null, "User ID"), " ",
                React.createElement("br", null),
                React.createElement("input", {
                    type: "text",
                    value: props.attributes.userID,
                    placeholder: "User ID",
                    onChange: updateUserID
                })
            ),
            React.createElement("div", null,
                React.createElement("label", null, "Project URL"), " ",
                React.createElement("br", null),
                React.createElement("input", {
                    type: "text",
                    value: props.attributes.projectURL,
                    placeholder: "Project URL",
                    onChange: updateProjectURL
                })
            ),
            React.createElement("div", { id: "image-container" }),
                React.createElement("div", null,
                    React.createElement("h3", { className: "project-name" }, props.attributes.projectName),
                    React.createElement("img", {
                        src: props.attributes.projectCover,
                        alt: props.attributes.projectName,
                        className: "xrCover"
                        })
                )
        );
    },
    
    save: function(props){
        return React.createElement("div", null, 
            React.createElement("h3", null, props.attributes.userID), 
            React.createElement("span", null, props.attributes.projectURL), 
            React.createElement("div", null, 
                React.createElement("h3", null, props.attributes.projectName), 
                React.createElement("img", {
                    src: props.attributes.projectCover,
                    alt: props.attributes.projectName,
                    className: "xrCover"
                })
            )
        );
    }
})

// id : b14016254
// project url : z2a


/**
 * edit :
 * <div>	
  <div>
    <label>User ID</label> <br/>
    <input type="text" value={ props.attributes.userID } placeholder="User ID" onChange={updateUserID} />
  </div>
  <div>
    <label>Project URL</label> <br/>
    <input type="text" value={ props.attributes.projectURL } placeholder="Project URL" onChange={updateProjectURL} />
  </div>
  <div>
    <h3>{ props.attributes.projectName }</h3>
  	<img src={ props.attributes.projectCover } alt={ props.attributes.projectName } />
  </div>
</div>
 *
 *save : 
 *<div>	
  <h3>{ props.attributes.userID }</h3>
  <span>{ props.attributes.projectURL }</span>
  <div>
    <h3>{ props.attributes.projectName }</h3>
  	<img src={ props.attributes.projectCover } alt={ props.attributes.projectName } />
  </div>
</div>
 */

// try {
//     const data = await fetch(url).then(response => response.json())

//     if(data.ok !== 'ok')
//         throw new Error(data);

//     set(this, "deleted", true );
    
//     console.log("deleted", name);

//     //if(data.ok == 'ok')alert("ok, deleted");

//     stopLoading();

// } catch(err) {
//     stopLoading();
//     console.error(err);
//     alert(`Failed to delete project\n `+ name);
// }