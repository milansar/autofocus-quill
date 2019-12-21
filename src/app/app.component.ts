import { Component } from "@angular/core";
import { LoadEventData, WebView } from 'tns-core-modules/ui/web-view';
import * as utils from "tns-core-modules/utils/utils";
import { isAndroid } from "tns-core-modules/ui/page/page";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    editor:string; 
    private wv: WebView;
    constructor(){
        this.editor = `<html>
        <head>       
        </head>
        <body>
        <!-- Include stylesheet -->
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

        <!-- Create the editor container -->
        <div id="editor">
        <p>Hello World!</p>
        <p>Some initial <strong>bold</strong> text</p>
        <p><br></p>
        </div>
        <!-- Include the Quill library -->
        <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

        <!-- Initialize Quill editor -->
        <script>
        var quill = new Quill('#editor', {
            theme: 'snow'
        });
        </script>        
        </body>
        </html>`;
    }
    onLoadFinished(event: LoadEventData) {
       console.log("webview content loaded");
       if(isAndroid){
          this.autoFocusAndroid();
       }              
    }

    private autoFocusAndroid() {
        const FOCUS_DOWN = 130;
        this.wv.android.requestFocus(FOCUS_DOWN);
        utils.ad.showSoftInput(this.wv.android);
        this.wv.android.evaluateJavascript(`quill.focus()`, null);
    }

    webViewLoaded(event){
        console.log("webview  loaded");
        this.wv = event.object;
    }
}
