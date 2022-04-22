import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


/**
 * 1. usuwanie: user ze zdjeciem, user bez zdjecia
 * 
 * 2. rejestracja 
 *    
 *                                person                                            institution
 * 
 *    ze zdjeciem         (podglad daynch ze swoim zdj ? TAK)               (podglad daynch ze swoim zdj ? TAK)
 *    
 *    bez zdjecia         (podglad daynch ze zdj 'person' ? TAK)            (blad i brak rejestracji danych ? TAK)
 * 
 *    istniejacy email    (blad i brak rejestracji danych ? TAK)            (blad i brak rejestracji danych ? TAK)
 * 
 *    brakujace dane      (blad i brak rejestracji danych ? TAK)            (blad i brak rejestracji danych ? TAK)
 * 
 * 3. edycja
 * 
 *                                  person                institution
 * 
 *    ten sam typ konta                                       (podglad ze zmienionymi danymi ? tak)
 *    
 *    inny typ konta                                          (podglad ze zmienionymi danymi ? tak)
 * 
 *    ze zmiana zdjecia                                       (podglad ze zmienionymi danymi ? tak)
 * 
 *    bez zmiany zdjecia                                      (podglad ze zmienionymi danymi ? tak)
 * 
 *    ze zmiana hasla                                         (logowanie ze zmienionym haslem ? tak)
 * 
 *    bez zmiany hasla                                        (podglad ze zmienionymi danymi ? tak)
 * 
 *  * ze zmiana emaila                                        (logowanie ze zmienionym emailem ? tak)
 * 
 *    bez zmiany emaila                                        (podglad ze zmienionymi danymi ? tak)
 * 
 * 4. logowanie
 * 
 *    czy zachowano stan zalogowania po odswiezeniu           (w local storage i chronione sciezki ? tak)
 * 
 *    czy sciezki sa chronione                                (przekierowanie ? dopiero po czasie)
 * 
 *    na istniejacego usera                                   (podglad danych, dane w local storage)
 * 
 *    na nieistniejacego                                      (blad ? tak)
 * 
 *    ze zlym emailem                                         (blad ? tak)
 * 
 *    ze zlym haslem                                          (blad ? tak)
 */