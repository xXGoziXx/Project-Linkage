import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Subscription } from 'rxjs';
import scrollIntoView from 'scroll-into-view-if-needed';
import { MinusIcon, PlusIcon, TrashIcon } from 'src/app/components/icons';
import { Product } from 'src/app/interfaces/product';

import { environment } from '../../../environments/environment';
import { ProductService } from '../../services/product.service';

declare let gtag: Function;
declare let fbq: Function;
@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {
  autocomplete!: google.maps.places.Autocomplete;
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean = false;
  detailsConfirmed: boolean = false;
  country!: string;
  isEU = true;

  checkoutFormSubscription!: Subscription;
  countries: any;
  continents: any;
  countryCode: string = "";
  confirmingDetails: boolean = false;
  PlusIcon = PlusIcon;
  MinusIcon = MinusIcon;
  TrashIcon = TrashIcon;
  constructor(public productService: ProductService) {
  }
  goToProduct(item: Product) {
    this.productService.selectedProduct = { ...item, quantity: 1 };
    this.productService.viewProduct = true;
    this.productService.preview = false;
  }
  increaseItem(index: number) {
    if (
      this.productService.cart.items[index].quantity <=
      this.productService.cart.items[index].stock[
        this.productService.cart.items[index].size
      ]
    ) {
      const product = this.productService.cart.items[index];
      const addToCart = {
        currency: "EUR",
        value: product.price,
        items: [
          {
            item_name: product.name,
            currency: "EUR",
            item_brand: "Linkage",
            price: product.price,
            quantity: product.quantity
          }
        ]
      };
      fbq("track", "AddToCart");
      gtag("event", "add_to_cart", addToCart);
      this.productService.cart.items[index].quantity++;
      localStorage.setItem(
        "project_linkage",
        JSON.stringify({ items: this.productService.cart.items })
      );
    } else {
      this.productService.showMaxStockReached();
    }
  }
  decreaseItem(index: number) {
    this.productService.cart.items[index].quantity--;
    if (this.productService.cart.items[index].quantity <= 0) {
      this.removeItem(index);
      const removeFromCart = {
        currency: "EUR",
        value: this.productService.cart.items[index].price,
        items: [
          {
            item_name: this.productService.cart.items[index].name,
            currency: "EUR",
            item_brand: "Linkage",
            price: this.productService.cart.items[index].price,
            quantity: this.productService.cart.items[index].quantity
          }
        ]
      };
      gtag("event", "remove_from_cart", removeFromCart);
    }

    localStorage.setItem(
      "project_linkage",
      JSON.stringify({ items: this.productService.cart.items })
    );
  }
  removeItem(index: number) {
    this.productService.cart.items.splice(index, 1);
    localStorage.setItem(
      "project_linkage",
      JSON.stringify({ items: this.productService.cart.items })
    );
  }
  async initCountryContinents() {
    this.countries = await (
      await fetch("../../../assets/json/countries.json")
    ).json();
    this.continents = await (
      await fetch("../../../assets/json/continents.json")
    ).json();
  }
  initAutocomplete() {
    let address1Field: HTMLInputElement;
    address1Field = document.querySelector("#address1") as HTMLInputElement;
    // Create the autocomplete object, restricting the search predictions to
    // addresses in the US and Canada.
    this.autocomplete = new google.maps.places.Autocomplete(address1Field, {
      // componentRestrictions: { country: ["us", "ca"] },
      fields: ["address_components", "geometry"],
      types: ["address"]
    });

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener("place_changed", () =>
      this.fillInAddress(this)
    );
  }
  fillInAddress(event: any) {
    // Get the place details from the autocomplete object.
    const place = event.autocomplete.getPlace();
    // console.log(place);
    // reset delivery values
    this.productService.checkoutForm.controls["address2"].setValue("");
    this.productService.checkoutForm.controls["locality"].setValue("");
    this.productService.checkoutForm.controls["state"].setValue("");
    this.productService.checkoutForm.controls["postcode"].setValue("");
    this.productService.checkoutForm.controls["country"].setValue("");
    let address2Field: HTMLInputElement = document.querySelector(
      "#address2"
    ) as HTMLInputElement;
    let address1 = "";
    let postcode = "";

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // place.address_components are google.maps.GeocoderAddressComponent objects
    // which are documented at http://goo.gle/3l5i5Mr
    for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];
      switch (componentType) {
        case "street_number": {
          address1 = `${component.long_name}${address1}`;
          break;
        }

        case "route": {
          address1 += ` ${component.long_name}`;
          break;
        }

        case "postal_code": {
          postcode = `${component.long_name}${postcode}`;
          break;
        }

        case "postal_code_suffix": {
          postcode = `${postcode}-${component.long_name}`;
          break;
        }
        case "postal_code_prefix": {
          postcode = `${component.long_name}${postcode}`;
          break;
        }
        case "postal_town": {
          this.productService.checkoutForm.controls["locality"].setValue(
            component.long_name
          );
          break;
        }
        case "locality": {
          if (
            this.productService.checkoutForm.controls["locality"].value === ""
          ) {
            this.productService.checkoutForm.controls["locality"].setValue(
              component.long_name
            );
          } else {
            address1 += `, ${component.long_name}`;
          }
          break;
        }
        case "administrative_area_level_1": {
          this.productService.checkoutForm.controls["state"].setValue(
            component.long_name
          );
          break;
        }

        case "country":
          this.productService.checkoutForm.controls["country"].setValue(
            component.long_name
          );
          break;
      }
    }
    this.productService.checkoutForm.controls["address1"].setValue(address1);
    this.productService.checkoutForm.controls["postcode"].setValue(postcode);

    // After filling the form with address components from the Autocomplete
    // prediction, set cursor focus on the second address line to encourage
    // entry of subpremise information such as apartment, unit, or floor number.
    address2Field.focus();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: "EUR",
      clientId: environment.paypalClientID,
      createOrderOnClient: data =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: parseFloat(
                  String(
                    this.productService.cart.totalPrice +
                      Number(
                        (
                          document.querySelector(
                            "select#deliveryOptions" +
                              (this.countryCode === "IE" ? "0" : "1")
                          ) as HTMLSelectElement
                        ).value
                      )
                  )
                ).toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: parseFloat(
                      String(this.productService.cart.totalPrice)
                    ).toFixed(2)
                  },
                  shipping: {
                    currency_code: "EUR",
                    value: (
                      document.querySelector(
                        "select#deliveryOptions" +
                          (this.countryCode === "IE" ? "0" : "1")
                      ) as HTMLSelectElement
                    ).value
                  }
                }
              },
              description: "Project Linkage Official Merch",
              soft_descriptor: "Linkage Merch",
              items: (this.productService.cart.items as Product[]).map(
                ({ name, size, quantity, price }) => ({
                  name: name + (size ? ` (${size})` : ""),
                  quantity: String(quantity),
                  unit_amount: {
                    currency_code: "EUR",
                    value: parseFloat(String(price)).toFixed(2)
                  },
                  category: "PHYSICAL_GOODS"
                })
              ),
              shipping: {
                name: {
                  full_name: this.productService.checkoutForm.controls[
                    "name"
                  ].value
                    ?.trim()
                    .split(" ")
                    .map(
                      (word: string) =>
                        word[0].toUpperCase() + word.substring(1)
                    )
                    .join(" ")
                },
                address: {
                  country_code: this.countryCode,
                  address_line_1:
                    this.productService.checkoutForm.controls["address1"].value,
                  address_line_2:
                    this.productService.checkoutForm.controls["address2"].value,
                  admin_area_2:
                    this.productService.checkoutForm.controls["locality"].value,
                  admin_area_1:
                    this.productService.checkoutForm.controls["state"].value,
                  postal_code:
                    this.productService.checkoutForm.controls["postcode"].value
                }
              }
            }
          ],
          payer: {
            name: {
              given_name: this.productService.checkoutForm.controls[
                "name"
              ].value
                ?.trim()
                .split(" ")
                .map(
                  (word: string) => word[0].toUpperCase() + word.substring(1)
                )
                .join(" ")
            },
            email_address:
              this.productService.checkoutForm.controls["email"].value,
            address: {
              country_code: this.countryCode,
              address_line_1:
                this.productService.checkoutForm.controls["address1"].value,
              address_line_2:
                this.productService.checkoutForm.controls["address2"].value,
              admin_area_2:
                this.productService.checkoutForm.controls["locality"].value,
              admin_area_1:
                this.productService.checkoutForm.controls["state"].value,
              postal_code:
                this.productService.checkoutForm.controls[
                  "postcode"
                ].value?.trim()
            }
          },
          application_context: {
            brand_name: "Project Linkage",
            locale: "en-IE",
            shipping_preference: "SET_PROVIDED_ADDRESS",
            user_action: "PAY_NOW"
          }
        },
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        shape: "rect",
        size: "responsive",
        color: "gold",
        layout: "vertical"
      },
      onApprove: (data, actions) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: async data => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );

        const orderData = {
          id: data.id,
          email:
            this.productService.checkoutForm.controls["email"].value?.trim(),
          name: this.productService.checkoutForm.controls["name"].value
            ?.trim()
            .split(" ")
            .map((word: string) => word[0].toUpperCase() + word.substring(1))
            .join(" "),
          country:
            this.productService.checkoutForm.controls["country"].value?.trim()
        };
        await this.productService.createOrder(orderData);
        const purchaseInfo = {
          currency: "EUR",
          transaction_id: orderData.id,
          value: this.productService.cart.totalPrice,
          shipping: Number(
            (
              document.querySelector(
                "select#deliveryOptions" +
                  (this.countryCode === "IE" ? "0" : "1")
              ) as HTMLSelectElement
            ).value
          ),
          items: this.productService.cart.items.map(product => ({
            item_name: product.name,
            currency: "EUR",
            item_brand: "Linkage",
            price: product.price,
            quantity: product.quantity
          }))
        };
        gtag("event", "add_shipping_info", purchaseInfo);
        fbq("track", "Purchase", {
          value: this.productService.cart.totalPrice,
          currency: "EUR"
        });
        this.productService.showOrderComplete();
        this.productService.checkoutForm.reset();
        this.productService.cart.items = [];
        localStorage.setItem("project_linkage", JSON.stringify({ items: [] }));
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
      },
      onError: err => {
        console.log("OnError", err);
        this.productService.showOrderIncomplete();
        this.productService.showOrderIncomplete();
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
      }
    };
  }
  async storeCustomerDetails() {
    this.confirmingDetails = true;

    if (this.continents === undefined && this.countries === undefined) {
      await this.initCountryContinents();
    }
    // console.log(this.countries);
    // console.log(this.continents);
    // console.log(this.countryCode);
    this.countryCode =
      this.getKeyByValue(this.countries, this.country) || this.country;
    const GB = ["UK", "Scotland", "Wales", "England", "Northern Ireland"];
    if (GB.includes(this.countryCode)) this.countryCode = "GB";
    console.log(this.countryCode);
    if (this.countryCode && this.continents[this.countryCode] !== "EU") {
      this.isEU = false;
    }
    if (this.isEU) {
      this.detailsConfirmed = true;
      setTimeout(() => {
        const paypalButton = document.getElementById("paypalButton");
        if (paypalButton)
          scrollIntoView(paypalButton, {
            // scrollMode: 'if-needed',
            behavior: "smooth",
            block: "end"
            // inline: 'nearest',
          });
      }, 300);
    } else {
      this.detailsConfirmed = false;
    }
    const shippingInfo = {
      currency: "EUR",
      value: (
        document.querySelector(
          "select#deliveryOptions" + (this.countryCode === "IE" ? "0" : "1")
        ) as HTMLSelectElement
      ).value,
      shipping_tier: (
        document.querySelector(
          "select#deliveryOptions" + (this.countryCode === "IE" ? "0" : "1")
        ) as HTMLSelectElement
      ).innerText
        .split("-")[0]
        .trim()
    };
    gtag("event", "add_shipping_info", shippingInfo);
    this.confirmingDetails = false;
  }

  initCustomSelect() {
    let customSelectLen, selElemLen, selElem, selItem, optionList, optionItem;
    /*look for any elements with the class "custom-select":*/
    const customSelect = document.getElementsByClassName("custom-select");
    customSelectLen = customSelect.length;
    for (let i = 0; i < customSelectLen; i++) {
      selElem = customSelect[i].getElementsByTagName("select")[0];

      selElemLen = selElem.length;
      /*for each element, create a new DIV that will act as the selected item:*/
      selItem = document.createElement("DIV");
      selItem.setAttribute("class", "select-selected");
      selItem.innerHTML = selElem.options[selElem.selectedIndex].innerHTML;
      customSelect[i].appendChild(selItem);
      /*for each element, create a new DIV that will contain the option list:*/
      optionList = document.createElement("DIV");
      optionList.setAttribute("class", "select-items select-hide");
      for (let j = 0; j < selElemLen; j++) {
        /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
        optionItem = document.createElement("DIV");
        optionItem.innerHTML = selElem.options[j].innerHTML;
        if (selElem.options[j].selected) {
          optionItem.setAttribute("class", "same-as-selected");
        }
        optionItem.addEventListener("click", function (e) {
          /*when an item is clicked, update the original select box, and the selected item:*/
          let sameAsSelected,
            select,
            previousSibling,
            selectLen,
            sameAsSelectedLen;
          select = (this.parentNode?.parentNode as any).getElementsByTagName(
            "select"
          )[0];
          selectLen = select.length;
          previousSibling = this.parentNode?.previousSibling as any;
          for (let i = 0; i < selectLen; i++) {
            if (select.options[i].innerHTML == this.innerHTML) {
              select.selectedIndex = i;
              if (previousSibling) previousSibling.innerHTML = this.innerHTML;
              sameAsSelected = (
                this.parentNode as HTMLElement
              ).getElementsByClassName("same-as-selected");
              sameAsSelectedLen = sameAsSelected.length;
              for (let k = 0; k < sameAsSelectedLen; k++) {
                sameAsSelected[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          previousSibling.click();
        });
        optionList.appendChild(optionItem);
      }
      customSelect[i].appendChild(optionList);
      const self = this;
      selItem.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
        e.stopPropagation();
        const shippingInfo = {
          currency: "EUR",
          value: (
            document.querySelector(
              "select#deliveryOptions" + (self.countryCode === "IE" ? "0" : "1")
            ) as HTMLSelectElement
          ).value,
          shipping_tier: (
            document.querySelector(
              "select#deliveryOptions" + (self.countryCode === "IE" ? "0" : "1")
            ) as HTMLSelectElement
          ).innerText
            .split("-")[0]
            .trim()
        };
        gtag("event", "add_shipping_info", shippingInfo);
        self.closeAllSelect(this);
        (this.nextSibling as any).classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", this.closeAllSelect);
  }
  closeAllSelect(elem: any) {
    /*a function that will close all select boxes in the document,
except the current select box:*/
    var selectItems,
      selectSelected,
      selectItemsLen,
      selectSelectedLength,
      arrNo = [];
    selectItems = document.getElementsByClassName("select-items");
    selectSelected = document.getElementsByClassName("select-selected");
    selectItemsLen = selectItems.length;
    selectSelectedLength = selectSelected.length;
    for (let i = 0; i < selectSelectedLength; i++) {
      if (elem == selectSelected[i]) {
        arrNo.push(i);
      } else {
        selectSelected[i].classList.remove("select-arrow-active");
      }
    }
    for (let i = 0; i < selectItemsLen; i++) {
      if (arrNo.indexOf(i)) {
        selectItems[i].classList.add("select-hide");
      }
    }
  }
  getKeyByValue(object: any, value: string) {
    return Object.keys(object).find((key: string) => object[key] === value);
  }
  ngOnInit(): void {
    this.checkoutFormSubscription =
      this.productService.checkoutForm.valueChanges.subscribe(x => {
        // console.log("form value changed");
        // console.log(x);
        // const name = this.productService.checkoutForm.controls["name"].value
        //   .split(" ")
        //   .map((word: string) => word[0].toUpperCase() + word.substring(1))
        //   .join(" ");
        this.country =
          this.productService.checkoutForm.controls["country"].value?.trim();
        this.detailsConfirmed = false;
        this.isEU = true;
      });
    this.initConfig();
    const viewCartInfo = {
      currency: "EUR",
      value: this.productService.cart.totalPrice,
      items: this.productService.cart.items.map(product => ({
        item_name: product.name,
        currency: "EUR",
        item_brand: "Linkage",
        price: product.price,
        quantity: product.quantity
      }))
    };
    gtag("event", "view_cart", viewCartInfo);
  }
  ngAfterViewInit(): void {
    this.initAutocomplete();
    this.initCustomSelect();
  }

  ngOnDestroy(): void {
    this.checkoutFormSubscription.unsubscribe();
  }
}
