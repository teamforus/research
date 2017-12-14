import { Artifact } from './../artifact';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export const ARTIFACTS: Artifact[] = [
  { id: 'ae1', name: 'Fiets' },
  { id: 'ae2', name: 'Pianoles' },
  { id: 'ae3', name: 'Mantelzorg' },
];

@Component({
  selector: 'app-provide',
  templateUrl: './provide.component.html',
  styleUrls: ['./provide.component.css']
})
export class ProvideComponent implements OnInit {

  artifacts = ARTIFACTS;

  modalArtifact: Artifact;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  onProvide(artifact: Artifact, content) {
      this.modalArtifact = Object.assign({}, artifact);

      this.modalService.open(content).result.then((result) => {
        Object.assign(artifact, this.modalArtifact);
        }, (reason) => {}
      );
  }

  onSponsor(artifact: Artifact) {
    console.log('Sponsor');
    console.log(artifact);
  }

  onNew(content) {
    this.modalArtifact = new Artifact();

    this.modalService.open(content).result.then((result) => {
      this.artifacts.push(this.modalArtifact);
      }, (reason) => {}
    );

  }

}
