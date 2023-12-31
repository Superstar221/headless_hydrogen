import {useState, useEffect} from 'react';
import {Money, flattenConnection} from '@shopify/hydrogen';
import clsx from 'clsx';
export const PlanPicker = ({selectedVariant, onChange, ...attrs}) => {
  const {className, ...restAttrs} = attrs;

  const [sellingPlan, setSellingPlan] = useState(false);
  useEffect(() => {
    onChange && onChange(sellingPlan);
  }, [sellingPlan, onChange]);

  const sellingPlanAllocations = flattenConnection(
    selectedVariant.sellingPlanAllocations,
  );

  // If no subscription
  if (!sellingPlanAllocations.length) {
    return null;
  }

  const onTypeChange = (type) => {
    switch (type) {
      case 'subscription':
        return (
          !sellingPlan && setSellingPlan(sellingPlanAllocations[0].sellingPlan)
        );
      case 'one_time':
      default:
        return setSellingPlan(false);
    }
  };

  const onSellingPlanChange = (e) => {
    const sellingPlanId = e.target.value;

    const sellingPlanAllocation = sellingPlanAllocations.find(
      (spa) => spa.sellingPlan.id === sellingPlanId,
    );
    if (!sellingPlan) {
      return;
    }
    setSellingPlan(sellingPlanAllocation.sellingPlan);
  };

  const subscriptionPrice = {
    ...sellingPlanAllocations[0].priceAdjustments[0].price,
    amount: String(
      Math.floor(sellingPlanAllocations[0].priceAdjustments[0].price.amount),
    ),
  };

  const subscriptionPercentage = Math.floor(
    100 - (subscriptionPrice.amount * 100) / selectedVariant.price.amount,
  );

  return (
    <fieldset
      className={`flex flex-col gap-2 mb-2 ${className}`}
      {...restAttrs}
    >
      {/* One Time Purchase */}
      <label
        className={clsx(
          'relative flex items-center justify-between gap-2 border border-background py-3 px-6 rounded-full cursor-pointer md:text-lg text-sm flex-wrap',
          {
            'bg-background text-white': !sellingPlan,
          },
        )}
      >
        <input
          className="peer absolute w-0 h-0 opacity-0"
          type="radio"
          value="one-time"
          checked={!sellingPlan}
          onChange={(e) => onTypeChange(e.currentTarget.value)}
        />
        <span className="block w-4 h-4 rounded-full peer-checked:bg-beige bg-background"></span>
        <div className="mr-auto uppercase">One-Time</div>
        <Money
          withoutTrailingZeros
          data={selectedVariant?.price}
          as="span"
          className="md:text-xl sm:text-lg text-base font-bold"
        />
      </label>

      {/* Subscription */}
      <label
        className={clsx(
          'relative flex items-center justify-between gap-2 border border-background py-3 px-6 cursor-pointer md:text-lg text-sm flex-wrap',
          {
            'bg-background text-white rounded-2xl': sellingPlan,
            'rounded-full': !sellingPlan,
          },
        )}
      >
        <input
          className="peer absolute w-0 h-0 opacity-0"
          type="radio"
          value="subscription"
          checked={!!sellingPlan}
          onChange={(e) => onTypeChange(e.currentTarget.value)}
        />
        <span className="block w-4 h-4 rounded-full peer-checked:bg-beige bg-background"></span>
        <div className="mr-auto uppercase">
          Subscribe <span className="hidden md:inline">and Save</span>
        </div>
        <span className="text-sm px-2 py-1 peer-checked:bg-beige bg-background rounded-lg peer-checked:text-background text-white">
          Save {subscriptionPercentage}%
        </span>
        <Money
          withoutTrailingZeros
          data={subscriptionPrice}
          as="span"
          className="md:text-xl sm:text-lg text-base font-bold"
        />
        {sellingPlan && (
          <div className="w-full px-6 py-1">
            <div className="flex flex-col md:flex-row gap-2 md:items-center border-t border-t-beige py-3 text-base">
              <span>Deliver Every:</span>
              <select
                name="selling_plan"
                value={sellingPlan.id}
                onChange={onSellingPlanChange}
                className="border border-beige bg-background focus:border-beige w-full max-w-[280px] text-base rounded-sm"
              >
                {sellingPlanAllocations.map((spa) => (
                  <option key={spa.sellingPlan.id} value={spa.sellingPlan.id}>
                    {spa.sellingPlan.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </label>

      {/* FAQ */}
      <div className="hidden md:block">
        <Details />
      </div>
    </fieldset>
  );
};

const Details = () => {
  return (
    <>
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
      .skio-details {
        --text-color: inherit;
        --text-color-secondary: #888; 
        
        user-select: none;
        -webkit-user-select: none;
      }

      .skio-details summary::-webkit-details-marker,
      .skio-details summary::marker {
        display: none;
      }

      .skio-details summary {
        list-style: none;
      }

      .skio-details summary span {
        font-size: 0.9em;
        display: flex;
        padding: 0 0 .5em 0;
        cursor: pointer;
        align-items: center;
        gap: 10px;
        text-decoration: underline;
      }

      @keyframes fadeInDown {
        0% {
          opacity: 0;
          transform: translateY(-15px);
        }
        100% {
          opacity: 1;
          transform: translateY(0px);
        }
      }
      .skio-details[open] > .skio-details--content {
        animation-name: fadeInDown;
        animation-duration: 0.3s;
      }

      .skio-details--content {
        position: absolute;
        z-index: 1020;
        padding: 1em;
        width: fit-content;
        border-radius: 5px;
        background: white;
        box-shadow: 0 0 5px rgb(23 24 24 / 5%), 0 1px 2px rgb(0 0 0 / 7%);
      }

      .skio-details ul {
        margin: 0;
        padding: 0;
      }

      .skio-details ul li {
        display: flex;
        align-items: flex-start;
        gap: .75em;

        margin-bottom: 1em;
      }

      .skio-details .skio-content {
        display: flex;
        flex-direction: column;
      }

      .skio-details .skio-content p {
        font-size: 0.9em;

        margin-top: 0;
        margin-bottom: 0;

        letter-spacing: 0;
        line-height: 1.5;

        color: var(--text-color);
      }

      .skio-details ul li small {
        font-size: 0.8em;
        color: var(--text-color-secondary);
      }

      .skio-details .skio-icon {
        display: flex;

        width: 2.25em;
        height: 2.25em;

        color: var(--text-color);
        background: #f8f8f8;
        border-radius: 100%;

        flex-shrink: 0;
        align-items: center;
        justify-content: center;
      }

      .skio-details .skio-icon svg {
        width: 1.25em;
        height: 1.25em;

        color: inherit;
      }

      .skio-details--footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.9em;
      }

      .skio-details--footer a {
        color: var(--text-color);
      }

      .skio-manage-link {
        text-decoration: underline;
      }

      .powered-by-skio {
        font-size: 0.8em;

        display: flex;
        text-decoration: none;
        
        align-items: center;
        gap: 3px;
      }
      `,
          }}
        />
        <details className="skio-details">
          <summary>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ai ai-ArrowRepeat"
              >
                <path d="M18 2l3 3-3 3" />
                <path d="M6 22l-3-3 3-3" />
                <path d="M21 5H10a7 7 0 0 0-7 7" />
                <path d="M3 19h11a7 7 0 0 0 7-7" />
              </svg>
              How do subscriptions work?
            </span>
          </summary>

          <div className="skio-details--content">
            <ul>
              <li>
                <div className="skio-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>

                <div className="skio-content">
                  <p>Get exclusive deals</p>
                  <small>Subscribe for unique discounts</small>
                </div>
              </li>

              <li>
                <div className="skio-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>

                <div className="skio-content">
                  <p>Edit your subscription anytime</p>
                  <small>Edit products, delivery schedule and more</small>
                </div>
              </li>

              <li>
                <div className="skio-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div className="skio-content">
                  <p>No commitment</p>
                  <small>Easy to cancel if it’s not for you</small>
                </div>
              </li>
            </ul>

            <div className="skio-details--footer">
              <a
                className="skio-manage-link"
                href="https://fulfld-skin.myshopify.com/a/account/login"
              >
                Manage subscriptions
              </a>

              <a
                className="powered-by-skio"
                href="https://skio.com/?utm_source={{ shop.name }}&utm_medium=details_popover"
                target="_blank"
                rel="noopener noreferrer"
              >
                Powered by
                <svg
                  width="24"
                  height="11"
                  viewBox="0 0 24 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.28399 5.78801C4.12399 5.63601 3.93599 5.50801 3.71999 5.40401C3.50399 5.30001 3.27599 5.24801 3.03599 5.24801C2.85199 5.24801 2.67999 5.28401 2.51999 5.35601C2.36799 5.42801 2.29199 5.55201 2.29199 5.72801C2.29199 5.89601 2.37599 6.01601 2.54399 6.08801C2.71999 6.16001 2.99999 6.24001 3.38399 6.32801C3.60799 6.37601 3.83199 6.44401 4.05599 6.53201C4.28799 6.62001 4.49599 6.73601 4.67999 6.88001C4.86399 7.02401 5.01199 7.20001 5.12399 7.40801C5.23599 7.61601 5.29199 7.86401 5.29199 8.15201C5.29199 8.52801 5.21599 8.84801 5.06399 9.11201C4.91199 9.36801 4.71199 9.57601 4.46399 9.73601C4.22399 9.89601 3.95199 10.012 3.64799 10.084C3.34399 10.156 3.03999 10.192 2.73599 10.192C2.24799 10.192 1.76799 10.116 1.29599 9.96401C0.831989 9.80401 0.443989 9.57201 0.131989 9.26801L1.23599 8.10401C1.41199 8.29601 1.62799 8.45601 1.88399 8.58401C2.13999 8.71201 2.41199 8.77601 2.69999 8.77601C2.85999 8.77601 3.01599 8.74001 3.16799 8.66801C3.32799 8.58801 3.40799 8.45201 3.40799 8.26001C3.40799 8.07601 3.31199 7.94001 3.11999 7.85201C2.92799 7.76401 2.62799 7.67201 2.21999 7.57601C2.01199 7.52801 1.80399 7.46401 1.59599 7.38401C1.38799 7.30401 1.19999 7.19601 1.03199 7.06001C0.871989 6.92401 0.739989 6.75601 0.635989 6.55601C0.531989 6.35601 0.479989 6.11601 0.479989 5.83601C0.479989 5.47601 0.555989 5.17201 0.707989 4.92401C0.859989 4.66801 1.05599 4.46001 1.29599 4.30001C1.53599 4.14001 1.79999 4.02401 2.08799 3.95201C2.38399 3.87201 2.67599 3.83201 2.96399 3.83201C3.41199 3.83201 3.84799 3.90401 4.27199 4.04801C4.70399 4.18401 5.06799 4.39201 5.36399 4.67201L4.28399 5.78801Z"
                    fill="black"
                  />
                  <path
                    d="M12.8481 10H10.4121L8.45615 7.13201H8.42015V10H6.44015V0.928009H8.42015V6.44801H8.45615L10.3641 4.02401H12.7521L10.4481 6.72401L12.8481 10Z"
                    fill="black"
                  />
                  <path
                    d="M15.7009 2.11601C15.7009 2.26801 15.6689 2.41201 15.6049 2.54801C15.5489 2.67601 15.4689 2.78801 15.3649 2.88401C15.2689 2.98001 15.1489 3.05601 15.0049 3.11201C14.8689 3.16801 14.7249 3.19601 14.5729 3.19601C14.2529 3.19601 13.9849 3.09201 13.7689 2.88401C13.5529 2.66801 13.4449 2.41201 13.4449 2.11601C13.4449 1.97201 13.4729 1.83601 13.5289 1.70801C13.5849 1.57201 13.6649 1.45601 13.7689 1.36001C13.8729 1.26401 13.9929 1.18801 14.1289 1.13201C14.2649 1.06801 14.4129 1.03601 14.5729 1.03601C14.7249 1.03601 14.8689 1.06401 15.0049 1.12001C15.1489 1.17601 15.2689 1.25201 15.3649 1.34801C15.4689 1.44401 15.5489 1.56001 15.6049 1.69601C15.6689 1.82401 15.7009 1.96401 15.7009 2.11601ZM13.5889 10V4.02401H15.5569V10H13.5889Z"
                    fill="black"
                  />
                  <path
                    d="M23.4516 6.98801C23.4516 7.47601 23.3636 7.92001 23.1876 8.32001C23.0116 8.71201 22.7716 9.04801 22.4676 9.32801C22.1636 9.60001 21.8116 9.81201 21.4116 9.96401C21.0116 10.116 20.5836 10.192 20.1276 10.192C19.6796 10.192 19.2516 10.116 18.8436 9.96401C18.4436 9.81201 18.0916 9.60001 17.7876 9.32801C17.4916 9.04801 17.2556 8.71201 17.0796 8.32001C16.9036 7.92001 16.8156 7.47601 16.8156 6.98801C16.8156 6.50001 16.9036 6.06001 17.0796 5.66801C17.2556 5.27601 17.4916 4.94401 17.7876 4.67201C18.0916 4.40001 18.4436 4.19201 18.8436 4.04801C19.2516 3.90401 19.6796 3.83201 20.1276 3.83201C20.5836 3.83201 21.0116 3.90401 21.4116 4.04801C21.8116 4.19201 22.1636 4.40001 22.4676 4.67201C22.7716 4.94401 23.0116 5.27601 23.1876 5.66801C23.3636 6.06001 23.4516 6.50001 23.4516 6.98801ZM21.5556 6.98801C21.5556 6.79601 21.5236 6.60801 21.4596 6.42401C21.3956 6.24001 21.3036 6.08001 21.1836 5.94401C21.0636 5.80001 20.9156 5.68401 20.7396 5.59601C20.5636 5.50801 20.3596 5.46401 20.1276 5.46401C19.8956 5.46401 19.6916 5.50801 19.5156 5.59601C19.3396 5.68401 19.1916 5.80001 19.0716 5.94401C18.9596 6.08001 18.8716 6.24001 18.8076 6.42401C18.7516 6.60801 18.7236 6.79601 18.7236 6.98801C18.7236 7.18001 18.7516 7.36801 18.8076 7.55201C18.8716 7.73601 18.9636 7.90401 19.0836 8.05601C19.2036 8.20001 19.3516 8.31601 19.5276 8.40401C19.7036 8.49201 19.9076 8.53601 20.1396 8.53601C20.3716 8.53601 20.5756 8.49201 20.7516 8.40401C20.9276 8.31601 21.0756 8.20001 21.1956 8.05601C21.3156 7.90401 21.4036 7.73601 21.4596 7.55201C21.5236 7.36801 21.5556 7.18001 21.5556 6.98801Z"
                    fill="black"
                  />
                </svg>
              </a>
            </div>
          </div>
        </details>
      </div>
    </>
  );
};
