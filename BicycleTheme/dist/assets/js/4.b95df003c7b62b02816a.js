(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{174:function(t,e,n){"use strict";n.r(e),n.d(e,"sendMail",(function(){return a}));n(170),n(59),n(60);var a=function(){var t=function(t){var e=this,n=new XMLHttpRequest;n.open("POST","mail.php"),n.setRequestHeader("Content-Type","application/json; charset=utf-8"),n.send(JSON.stringify(t));var a=document.querySelector(".contact__text");a.textContent="Loading...",n.addEventListener("load",(function(){200==n.status?alert("Сообщение отправлено. Скоро мы с вами свяжемся!"):alert("Ошибка ".concat(n.status,": ").concat(n.statusText))})),n.addEventListener("error",(function(){return alert("Ошибка соединения или неверный URL")})),n.addEventListener("loadend",(function(){a.textContent="Stay on the saddle!",e.reset()}))};document.querySelectorAll(".form").forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault();for(var n=new FormData(this),a={},o=0;o<n.length;o++)a[n[o][0]]=a[n[o][1]];t.call(this,a)}))}))}}}]);