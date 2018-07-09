import { Artifact } from './../artifact';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ArtifactService } from '../artifact.service';


@Component({
  selector: 'app-provide',
  templateUrl: './provide.component.html',
  styleUrls: ['./provide.component.css']
})
export class ProvideComponent implements OnInit {

  modalArtifact: Artifact;

  constructor(
    private modalService: NgbModal,
    private artifactService: ArtifactService
  ) { }

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
      this.artifactService.addArtifact(this.modalArtifact.name, false, 0);
      }, (reason) => {}
    );

  }

}
