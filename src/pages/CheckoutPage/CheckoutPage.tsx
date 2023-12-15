import React, { useEffect, useState } from "react";
import "./CheckoutPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import producerStore from "../../stores/producer-store";
import { CalculatorTitle } from "../../components/CalculatorTitle";
import { SingleService, Title } from "../../components/Calculator/calculator-types";
import stepStore from "../../stores/step-store";

interface Page {
  page: string
  price: number
}

export const CheckoutPage: React.FC = React.memo(() => {
  const { producer } = producerStore;
  const { arraysOfSteps } = stepStore;
  const title: Title = {
    blackTitle: "Проверьте ваше предложение - ID 806 v.1",
    greyTitle: `Производитель (${producer})`
  }

  const [pages, setPages] = useState<Array<Page>>([]);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const checkoutPages = [...arraysOfSteps[producer]].filter((page: string) => {
      const unavailablePages = [
        "welcome",
        "angebotType",
        "pvsolFile",
        "projectImages",
        "producer",
        "checkout",
        "bravo"
      ];

      return !unavailablePages.includes(page);
    });

    const pagePrices = checkoutPages.map((page) => {
      const storedItem = sessionStorage.getItem(page);
      let totalPrice = 0;

      if (storedItem) {
        const itemData = JSON.parse(storedItem);

        // Перевірка наявності і підрахунок суми для singleServices
        if (itemData.singleServices) {
          totalPrice += itemData.singleServices.reduce((sum: number, service: SingleService) => sum + (service.price || 0), 0);
        }

        // Перевірка наявності і підрахунок суми для selectServices
        if (itemData.selectServices) {
          totalPrice += itemData.selectServices.reduce((sum: number, service: SingleService) => sum + (service.price || 0), 0);
        }
      }

      return { page, price: totalPrice };
    });

  
    setPages(pagePrices)
  }, [producer, arraysOfSteps]);

  useEffect(() => {
    const sum = pages.reduce((acc, currentPage) => {
      // Додавання ціни поточної сторінки до загальної суми
      return acc + (currentPage.price || 0);
    }, 0);

    setTotal(sum);
  }, [pages]);





  return (
    <div className="checkoutPage">
      <Header />
      <div className="checkoutPage__container">
        <CalculatorTitle title={title} />
        <div className="pageList">
          {pages && (
            pages.map(el => (
              <div className="pageItem" key={el.page}>
                <p>{el.page}</p>
                <p className="page-price">{el.price}.00€</p>
              </div>
            ))
          )}
        </div>
        <div className="totalPriceForAllPages">
          <p>Общая стоимость</p>
          <p>{total}.00€</p>
        </div>
      </div>
      <Footer isCalculator={true} />
    </div>
  );
})
