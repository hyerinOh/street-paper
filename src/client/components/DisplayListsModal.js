import React, { Component } from 'react';

export default class DisplayListsModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleListModal, allPapers, targetLat, targetLon
    } = this.props;
    return (
      <div>
        <div className="modal display-block">
          <div className="modal-main">
            <button
              type="button"
              className="closeBtn"
              onClick={handleListModal}
            >
              x
            </button>
            <div>
              {
                allPapers[0].data.map((paper) => {
                  if (
                    targetLat === paper.loc.coordinates[0]
                  && targetLon === paper.loc.coordinates[1]
                  ) {
                    return (
                      <div className="paper-list">
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
