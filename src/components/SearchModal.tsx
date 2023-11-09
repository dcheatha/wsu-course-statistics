import { RefObject } from "react";

export function SearchModal(props: { children?: React.ReactNode }) {
  return <div className="modal modal-xl fade" id="searchModal" aria-labelledby="searchModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="searchModalLabel">Search</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Done</button>
        </div>
      </div>
    </div>
  </div>
}
