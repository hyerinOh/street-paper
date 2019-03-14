import React, { Component } from 'react';
import axios from 'axios';

export default class DisplayListsModal extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <div className="modal display-block">
          <div className="modal-main">
            <button
              type="button"
              className="closeBtn"
              onClick={this.props.handleListModal}
            >
              x
            </button>
            <div>
              {
                this.props.allPapers[0].data.map((paper) => {
                  if (
                    this.props.targetLat === paper.loc.coordinates[0]
                  && this.props.targetLon === paper.loc.coordinates[1]
                  ) {
                    return (
                      <div>
                        <p className="list-date">{paper.createdAt}</p>
                        <p>{paper.nickname}</p>
                        <p>{paper.memo}</p>
                      </div>
                    );
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
