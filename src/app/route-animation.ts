//Inspired by : https://medium.com/@tejozarkar/angular-route-transition-animation-in-5-easy-steps-ab0ddc8230e
import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    animateChild
 } from '@angular/animations';
 export const slideInAnimation =
    trigger('routeAnimations', [
         transition('Reviews => *', [
              query(':enter, :leave', 
                   style({ position: 'fixed', width: '100%' }), 
                   { optional: true }),        
              group([
                   query(':enter',[
                       style({ transform: 'translateX(-100%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                       style({ transform:   'translateX(0%)'}),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(100%)' }))
                   ], { optional: true }),
              ])
         ]),
         transition('Pictures => *', [
              query(':enter, :leave', 
                   style({ position: 'fixed', width: '100%' }), 
                   { optional: true }),        
              group([
                   query(':enter',[
                       style({ transform: 'translateX(-100%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                       style({ transform:   'translateX(0%)'}),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(100%)' }))
                   ], { optional: true }),
              ])
         ]),
         transition('News => *', [
              query(':enter, :leave', 
                   style({ position: 'fixed', width: '100%' }), 
                   { optional: true }),        
              group([
                   query(':enter',[
                       style({ transform: 'translateX(-100%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                       style({ transform:   'translateX(0%)'}),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(100%)' }))
                   ], { optional: true }),
              ])
         ]),
         transition('Gestion => Home', [
              query(':enter, :leave', 
                   style({ position: 'fixed', width: '100%' }), 
                   { optional: true }),        
              group([
                   query(':enter',[
                       style({ transform: 'translateX(-100%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                       style({ transform:   'translateX(0%)'}),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(100%)' }))
                   ], { optional: true }),
              ])
         ]),
         transition('Gestion => Reviews', [
              query(':enter, :leave', 
                   style({ position: 'fixed',  width: '100%' }), 
                   { optional: true }),
              group([
                   query(':enter', [
                       style({ transform: 'translateX(100%)' }), 
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                       style({ transform: 'translateX(0%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(-100%)' }))
                       ], { optional: true }),
               ])
         ]),
         transition('Gestion => News', [
              query(':enter, :leave', 
                   style({ position: 'fixed',  width: '100%' }), 
                   { optional: true }),
              group([
                   query(':enter', [
                       style({ transform: 'translateX(100%)' }), 
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                       style({ transform: 'translateX(0%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(-100%)' }))
                       ], { optional: true }),
               ])
         ]),
         transition('Gestion => Pictures', [
              query(':enter, :leave', 
                   style({ position: 'fixed',  width: '100%' }), 
                   { optional: true }),
              group([
                   query(':enter', [
                       style({ transform: 'translateX(100%)' }), 
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                       style({ transform: 'translateX(0%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(-100%)' }))
                       ], { optional: true }),
               ])
         ]),
         transition('Home => Gestion', [
              query(':enter, :leave', 
                   style({ position: 'fixed',  width: '100%' }), 
                   { optional: true }),
              group([
                   query(':enter', [
                       style({ transform: 'translateX(100%)' }), 
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                       style({ transform: 'translateX(0%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(-100%)' }))
                       ], { optional: true }),
               ])
         ]),
         transition('Pictures => Gestion', [
               query(':enter, :leave', 
                   style({ position: 'fixed', width: '100%' }), 
                   { optional: true }),
               group([
                   query(':enter', [
                       style({ transform: 'translateX(-100%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                        style({ transform: 'translateX(0%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(100%)' }))
                   ], { optional: true }),
               ])
        ]),
         transition('Reviews => Gestion', [
               query(':enter, :leave', 
                   style({ position: 'fixed', width: '100%' }), 
                   { optional: true }),
               group([
                   query(':enter', [
                       style({ transform: 'translateX(-100%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                        style({ transform: 'translateX(0%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(100%)' }))
                   ], { optional: true }),
               ])
        ]),
         transition('News => Gestion', [
               query(':enter, :leave', 
                   style({ position: 'fixed', width: '100%' }), 
                   { optional: true }),
               group([
                   query(':enter', [
                       style({ transform: 'translateX(-100%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                        style({ transform: 'translateX(0%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(100%)' }))
                   ], { optional: true }),
               ])
        ]),
 ]);