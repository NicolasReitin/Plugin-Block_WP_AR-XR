wp.blocks.registerBlockType('xrplus/custom-block', {
    title: 'XR+ Player',
    icon: 'no-alt',
    category: 'design',
    attributes: {
        userID: {type: 'string'},
        projectURL: {type: 'string'},
        projectName: {type: 'string'},
        projectCover: {type: 'string'},
        isProjectValid: {type: 'boolean'},
        // player_height: {type: 'integer'},
        settings: {
            type: 'object',
            default: {
                shadows: false,
                roundedCorners: false,
                emptySpace: true,
                startSelect: 'cover',
                // playCoverVideo: false,
                allow3dComputer: true,
                playerHeight: 400
            },
        },
    },
    
    edit: function(props){
        console.log("edit ++++++++++++++");

        function updateRangeValue(e) {
            const playerHeight = e.target.value;
            document.getElementById('range-value').innerHTML = playerHeight+" px";

            const currentSettings = props.attributes.settings || {};
            const newPlayerHeight = { ...currentSettings, playerHeight };
            props.setAttributes({ settings: newPlayerHeight });

        }
        
        function updateSelectValue(e){
            const startSelect = e.target.value;
            const currentSettings = props.attributes.settings || {};
            const newStartSelect = { ...currentSettings, startSelect };
            props.setAttributes({ settings: newStartSelect });
        }

        function updateSetting(property) {
            return function (e) {
                const value = e.target.checked;
                // Assurez-vous que settings est initialisé
                const currentSettings = props.attributes.settings || {};
                // Mettez à jour la propriété spécifiée dans settings
                const newSettings = { ...currentSettings, [property]: value };
                // Mettez à jour les attributs avec le nouvel objet settings
                props.setAttributes({ settings: newSettings });
                console.log(`${property}: ${newSettings[property]}`);
            };
        }

        // Utilisation de la fonction pour mettre à jour la propriété "shadows"
        const updateShadows = updateSetting('shadows');
        // Utilisation de la fonction pour mettre à jour la propriété "roundedCorners"
        const updateRoundedCorners = updateSetting('roundedCorners');
        // Utilisation de la fonction pour mettre à jour la propriété "emptySpace"
        const updateEmptySpace = updateSetting('emptySpace');
        // Utilisation de la fonction pour mettre à jour la propriété "playCoverVideo"
        // const updatePlayCoverVideo = updateSetting('playCoverVideo');
        // Utilisation de la fonction pour mettre à jour la propriété "allow3dComputer"
        const updateAllow3dComputer = updateSetting('allow3dComputer');

        // function updateShadows(e) {
        //     const shadows = e.target.checked;
        //     // Assurez-vous que settings est initialisé
        //     const currentSettings = props.attributes.settings || {};
        //     // Mettez à jour la propriété shadows dans settings
        //     const newShadows = { ...currentSettings, shadows };
        //     // Mettez à jour les attributs avec le nouvel objet settings
        //     props.setAttributes({ settings: newShadows });
        //     console.log("shadows: " + newShadows.shadows);
        // }


        function resetSettings() {
            // Mettez à jour chaque setting avec sa valeur spécifique
            props.setAttributes({projectName: undefined})
            props.setAttributes({projectCover: undefined})
            props.setAttributes({isProjectValid: undefined})
            props.setAttributes({
                settings: {
                    shadows: false,
                    roundedCorners: false,
                    emptySpace: true,
                    startSelect: 'cover',
                    // playCoverVideo: false,
                    allow3dComputer: true,
                    playerHeight: 400
                }
            });
        }

        function updateUserID(e) { 
          props.setAttributes({userID: e.target.value}) 
        }

        function updateProjectURL(e) { 
          let url = e.target.value
          let fetchURL = `https://xr.plus/embed/get/project.php?userID=${props.attributes.userID}&projectURL=${url}`;

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
                      console.log(data);
                      if (data.error)
                      {
                          alert("Error : this project does not exist");
                          throw ("error 5978");
                      }

                      props.setAttributes({projectName: data.name})
                      props.setAttributes({projectCover: data.cover})

                      props.setAttributes({isProjectValid: true})

                      console.log('A', props.attributes.isProjectValid);

                      console.log("json data:");
                      console.log(data)

              })
              .catch(function (error) {
                  console.error("Error:", error);

              });
          }else{
              resetSettings();
          }
        }

        if(!props.attributes.isProjectValid){

            return React.createElement(
                React.Fragment, null, 
                    React.createElement("div", {
                        className: "parentBefore"
                    }, 
                        React.createElement("div", {
                            className: "div1"
                        }, 
                            React.createElement("img", {
                                className: "logo_xr",
                                src: "../wp-content/plugins/xrplus/assets/LogoXR-300x150.png",
                                alt: "logo xr+"
                                })
                        ), 
                        React.createElement("div", {
                            className: "div2"
                        }, 
                            React.createElement("p", null, "Paste the userID and URL of your XR+ project.")), 
                        React.createElement("div", {
                            className: "div3 block-input-before"
                        }, 
                            React.createElement("div", {
                                className: "input-line1"
                            }, 
                                React.createElement("label", null, "XR+ user ID"), " ", 
                                React.createElement("br", null), 
                                React.createElement("input", {
                                    type: "text",
                                    value: props.attributes.userID,
                                    placeholder: "Enter your user ID",
                                    onChange: updateUserID
                                }
                                )
                            ), 
                            React.createElement("div", {
                                className: "input-line2"
                            }, 
                                React.createElement("label", null, "Project URL"), " ", 
                                React.createElement("br", null), 
                                React.createElement("input", {
                                    type: "text",
                                    value: props.attributes.projectURL,
                                    placeholder: "Enter the url of your project",
                                    onChange: updateProjectURL
                                    })
                            )
                        ),
                        React.createElement("div", {
                            class: "div7"
                          }, React.createElement("a", {
                            href: "https://xr.plus",
                            target: "_blank"
                          }, "Learn more about XR+"))                        
                    )
            );
    

        }else{

            return React.createElement(
              React.Fragment, null,
                React.createElement("div", {
                  className: "parentAfter"
                }, 
                  React.createElement("div", {
                    class: "div1"
                  }, 
                    React.createElement("img", {
                      className: "logo_xr",
                      src: "../wp-content/plugins/xrplus/assets/LogoXR-300x150.png",
                      alt: "logo xr+"
                    }), 
                    React.createElement("h3", null, props.attributes.projectName)), 
                  React.createElement("div", {
                    class: "div2"
                  }, 
                    React.createElement("p", null, "Paste the userID and URL of your XR+ project.")), 
                  React.createElement("div", {
                    class: "div3 block-input-before"
                  }, 
                    React.createElement("div", {
                      className: "input-line1"
                    }, 
                      React.createElement("label", null, "XR+ user ID"), " ", 
                      React.createElement("br", null), 
                      React.createElement("input", {
                        type: "text",
                        value: props.attributes.userID,
                        placeholder: "XR+ user ID",
                        onChange: updateUserID
                      })
                    ), 
                    React.createElement("div", {
                      className: "input-line2"
                    }, 
                      React.createElement("label", null, "Project URL"), " ", 
                      React.createElement("br", null), 
                      React.createElement("input", {
                        type: "text",
                        maxlength: "3",
                        value: props.attributes.projectURL,
                        placeholder: "Project URL",
                        onChange: updateProjectURL
                      })
                    )
                  ), 
                  React.createElement("div", {
                    class: "div5"
                  }, 
                    React.createElement("div", {
                      className: "input-checkbox"
                    }, 
                      React.createElement("label", {
                        for: "shadows"
                      }, "Add shadows around the player"), 
                      React.createElement("input", {
                        type: "checkbox",
                        id: "shadows",
                        name: "shadows",
                        checked: props.attributes.settings.shadows,
                        onChange: updateShadows
                      })
                    ), 
                    React.createElement("div", {
                      className: "input-checkbox"
                    }, 
                      React.createElement("label", {
                        for: "roundedCorners"
                      }, "Rounded corners"), 
                      React.createElement("input", {
                        type: "checkbox",
                        id: "roundedCorners",
                        name: "roundedCorners",
                        checked: props.attributes.settings.roundedCorners,
                        onChange: updateRoundedCorners
                      })
                    ), 
                    React.createElement("div", {
                      className: "input-checkbox"
                    }, 
                      React.createElement("label", {
                        for: "emptySpace"
                      }, "Empty space above and below"), 
                      React.createElement("input", {
                        type: "checkbox",
                        id: "emptySpace",
                        name: "emptySpace",
                        checked: props.attributes.settings.emptySpace,
                        onChange: updateEmptySpace
                      })
                    ), 
                    React.createElement("div", {
                      className: "input-select"
                    }, 
                      React.createElement("select", {
                        id: "mySelect",
                        name: "mySelect",
                        value: props.attributes.settings.startSelect,
                        onChange: updateSelectValue
                      }, 
                        React.createElement("option", {
                          value: "cover",
                          selected: true
                        }, "Start with cover screen"), 
                        React.createElement("option", {
                          value: "3d"
                        }, "Start with 3D manipulation screen")
                      )
                    ), 
                    React.createElement("div", {
                      className: "input-checkbox"
                    }, 
                      // React.createElement("label", {
                          // for: "playCoverVideo"
                      // }, "Play cover video on rollover"), 
                        // React.createElement("input", {
                        //   type: "checkbox",
                        //   id: "playCoverVideo",
                        //   name: "playCoverVideo",
                        //   checked: props.attributes.settings.playCoverVideo,
                        //   onChange: updatePlayCoverVideo
                      // })
                    ), 
                    React.createElement("div", {
                      className: "input-checkbox"
                    }, 
                      React.createElement("label", {
                        for: "allow3dComputer"
                      }, "Allow 3D mode on computer"), 
                      React.createElement("input", {
                        type: "checkbox",
                        id: "allow3dComputer",
                        name: "allow3dComputer",
                        checked: props.attributes.settings.allow3dComputer,
                        onChange: updateAllow3dComputer
                      })
                    ), 
                    React.createElement("div", {
                      className: "input-range"
                    }, 
                      React.createElement("label", {
                        for: "player_height"
                      }, "Player height"), 
                      React.createElement("span", {
                        id: "range-value"
                      }, "400 px"), 
                      React.createElement("input", {
                        type: "range",
                        id: "playerHeight",
                        name: "player_height",
                        min: "300",
                        max: "500",
                        step: "50",
                        defaultValue: props.attributes.settings.playerHeight || "400",
                        onChange: updateRangeValue
                      })
                    )
                  ), 
                  React.createElement("div", {
                    class: "div6"
                  }, 
                    React.createElement("img", {
                      src: props.attributes.projectCover,
                      alt: props.attributes.projectName
                    })
                  ), 
                  React.createElement("div", {
                    class: "div7"
                  }, 
                    React.createElement("a", {
                      href: "https://xr.plus",
                      target: "_blank"
                    }, "Learn more about XR+"))
                )
            );
        }
    },
    
    save: function(props){
      var aaa = "bbb"
        // Code HTML et scripts à injecter
      const embeddedCode = `
        <div id="ARPlayer_${props.attributes.projectURL}"></div>
        <script src="https://xr.plus/embed/xrplusplayer.js"></script>
        <script>
            var ARPlayer_${props.attributes.projectURL} = new XRPlusPlayer({
                project: "${props.attributes.projectURL}",
                id: "ARPlayer_${props.attributes.projectURL}",
                start: "${props.attributes.settings.startSelect}",
                computer3DMode: ${props.attributes.settings.allow3dComputer},
                height: "${props.attributes.settings.playerHeight}px",
                shadow: ${props.attributes.settings.shadows},
                roundedCorners: ${props.attributes.settings.roundedCorners ? 10 : null},
                margin: "${props.attributes.settings.emptySpace ? "" : '0 auto'}"
              });
              </script>
              `;
              // coverVideoRollOver: ${props.attributes.settings.playCoverVideo}
              
    return React.createElement('div', {
        dangerouslySetInnerHTML: { __html: embeddedCode }
    });
        

        // const ARPlayer = new XRPlusPlayer({
        //   project: props.attributes.projectURL,
        //   id: props.attributes.userID,
        //   start: props.attributes.settings.startSelect,
        //   computer3DMode: props.attributes.settings.allow3dComputer,
        //   height: props.attributes.settings.playerHeight
        // });
    }
})

// id : b14016254
// project url : z2a


/**
 * 
 * src: "../wp-content/plugins/xrplus/LogoXR-300x150.png",
 * 
 * edit :
 * <div>	
  <div>
    <img className="logo_xr" src="../wp-content/plugins/xrplus/LogoXR-300x150.png" alt="logo xr+" />
  </div>
  <h3>{ props.attributes.projectName }</h3>
  <div>
    <label>User ID</label> <br/>
    <input type="text" value={ props.attributes.userID } placeholder="User ID" onChange={updateUserID} />
  </div>
  <div>
    <label>Project URL</label> <br/>
    <input type="text" value={ props.attributes.projectURL } placeholder="Project URL" onChange={updateProjectURL} />
  </div>
  <div>
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



                       

    // // Ici, vous pouvez mettre à jour l'image de manière synchrone
    // const imgElement = document.createElement("img");
    // imgElement.src = props.attributes.projectCover;
    // imgElement.alt = props.attributes.projectName;
    // imgElement.className = "xrCover";

    // // Remplacez l'ancien contenu par la nouvelle image
    // const imageContainer = document.getElementById("image-container");
    // imageContainer.innerHTML = "";
    // imageContainer.appendChild(imgElement);
    
