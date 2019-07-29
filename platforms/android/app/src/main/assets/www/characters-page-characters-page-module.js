(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["characters-page-characters-page-module"],{

/***/ "./src/app/characters-page/characters-page.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/characters-page/characters-page.module.ts ***!
  \***********************************************************/
/*! exports provided: CharactersPagePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharactersPagePageModule", function() { return CharactersPagePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _characters_page_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./characters-page.page */ "./src/app/characters-page/characters-page.page.ts");







var routes = [
    {
        path: '',
        component: _characters_page_page__WEBPACK_IMPORTED_MODULE_6__["CharactersPagePage"]
    }
];
var CharactersPagePageModule = /** @class */ (function () {
    function CharactersPagePageModule() {
    }
    CharactersPagePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_characters_page_page__WEBPACK_IMPORTED_MODULE_6__["CharactersPagePage"]]
        })
    ], CharactersPagePageModule);
    return CharactersPagePageModule;
}());



/***/ }),

/***/ "./src/app/characters-page/characters-page.page.html":
/*!***********************************************************!*\
  !*** ./src/app/characters-page/characters-page.page.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>charactersPage</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/characters-page/characters-page.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/characters-page/characters-page.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoYXJhY3RlcnMtcGFnZS9jaGFyYWN0ZXJzLXBhZ2UucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/characters-page/characters-page.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/characters-page/characters-page.page.ts ***!
  \*********************************************************/
/*! exports provided: CharactersPagePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharactersPagePage", function() { return CharactersPagePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CharactersPagePage = /** @class */ (function () {
    function CharactersPagePage() {
    }
    CharactersPagePage.prototype.ngOnInit = function () {
    };
    CharactersPagePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-characters-page',
            template: __webpack_require__(/*! ./characters-page.page.html */ "./src/app/characters-page/characters-page.page.html"),
            styles: [__webpack_require__(/*! ./characters-page.page.scss */ "./src/app/characters-page/characters-page.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CharactersPagePage);
    return CharactersPagePage;
}());



/***/ })

}]);
//# sourceMappingURL=characters-page-characters-page-module.js.map