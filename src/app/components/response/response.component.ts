import { Component, OnInit,Injectable } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';

export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

const TREE_DATA = JSON.stringify({
  Applications: {
    Calendar: 'app',
    Chrome: 'app',
    Webstorm: 'app'
  },
  Documents: {
    angular: {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    material2: {
      src: {
        button: 'ts',
        checkbox: 'ts',
        input: 'ts'
      }
    }
  },
  Downloads: {
    October: 'pdf',
    November: 'pdf',
    Tutorial: 'html'
  },
  Pictures: {
    'Photo Booth Library': {
      Contents: 'dir',
      Pictures: 'dir'
    },
    Sun: 'png',
    Woods: 'jpg'
  }
});


@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    //const dataObject = JSON.parse(TREE_DATA);

    if ((localStorage.getItem("response") === null)) {
      console.log("empty");
      var obj = {

      }
      const dataObject = JSON.parse(JSON.stringify(obj));
      const data = this.buildFileTree(dataObject, 0);
      this.dataChange.next(data);
    }
    else{
      console.log("found");
      const dataObject = JSON.parse(localStorage.getItem("response"));
      // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
      //     file node as children.
      const data = this.buildFileTree(dataObject, 0);
  
      // Notify the change.
      this.dataChange.next(data);
    }
 
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: object, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}



@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css'],
  providers: [FileDatabase]
})
export class ResponseComponent implements OnInit {

  
  private localStorage = window.localStorage; 
    nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  constructor(database: FileDatabase) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }

  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

  private _getChildren = (node: FileNode) => node.children;

  
  ngOnInit() {
  }

  

  code(a){
    console.log("JSON."+a);
    return "JSON."+a;
  }
  

}
