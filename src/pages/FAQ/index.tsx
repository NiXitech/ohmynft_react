// import Footer from "../../components/footer";

const FAQ = (): JSX.Element => {
  return (
    <>
      <main className="flex flex-wrap grow mt-12 xl:mt-16 px-4 pb-10 lg:px-8 transition-all duration-300 page-enter:opacity-0 page-enter:-translate-y-4 layout-enter:opacity-0 layout-enter:-translate-y-4 pt-16">
        <div className="w-full mx-auto max-w-5xl 5xl:container">
          <div className="prose prose-invert w-full max-w-none textPage" >
            <div>
              <h1>FAQ</h1>
              <ol className="ord">
                <li><h2 id='how-do-competitions-work'>How do Competitions work?</h2>
                </li>


                <ul>
                  <li>Entries are purchased with ohmynft transactions only.</li>

                </ul>
                <ul>
                  <li>Free entries still require gas pay.</li>

                </ul>
                <ul>
                  <li>Purchased entries are then added to the smart contract.</li>

                </ul>
                <ul>
                  <li>Once the Competition draw criteria have been fulfilled, the competition will no longer accept new entries and the smart contract will draw a winner using Chainlink’s unbiased prize winner selection technology.</li>

                </ul>
                <ul>
                  <li>Once a winner is selected, the smart contract will automatically process the transfer of the prize to the winner</li>

                </ul>

                <li><h2 id='how-will-you-contact-me-if-ive-won-a-prize'>How will you contact me if I’ve won a prize?</h2>
                </li>


                <p>Once a winner is drawn, your prize is automatically transferred to your wallet. Winners will be contacted by email, and an on-screen notification if they are currently viewing ohmynft.space. </p>

                <li><h2 id='how-are-winners-drawn'>How are winners drawn?</h2>
                </li>


                <p>When you buy entries, your unique entry is securely stored in the competition smart contract. The more entries you buy, the more times they are logged. For example, if you buy 15 tickets, all 15 are submitted to the smart contract as separate entries, increasing the chances of being drawn for a prize. If you entered by post, and received it before the competition closes, a single entry is submitted to the smart contract.</p>

                <li><h2 id='what-is-a-smart-contract'>What is a Smart Contract?</h2>
                </li>


                <p>A smart contract is an agreement written in a virtual language and has the power to execute and enforce itself, autonomously and automatically, based on a series of programmed parameters. Smart contracts are executed in the blockchain, which means the terms are stored in a distributed database and cannot be changed. They’re also viewable publicly, so you can verify the terms of the contract on the blockchain at any time.</p>

                <li><h2 id='does-ohmynft-draw-the-winners'>Does ohmynft draw the winners?</h2>
                </li>


                <p>All draws utilize Chainlink’s unbiased prize winner selection technology, which is tamperproof. This means that website has zero input or influence over the results of the draws, ensuring that all results are completely random.</p>

                <li><h2 id='will-someone-definitely-win-the-nft'>Will someone definitely win the NFT?</h2>
                </li>


                <p>Yes. There will always be a guaranteed winner for the NFT draws.</p>

                <li><h2 id='the-competition-i-entered-isnt-full-yet-when-will-it-draw'>The Competition I entered isn’t full yet, when will it draw?</h2>
                </li>


                <p>All competitions will draw automatically when the required criteria are met. Criteria can be timed, max entries or ETH raised.</p>

                <li><h2 id='what-are-the-odds-of-winning-the-competition-nft'>What are the odds of winning the Competition NFT?</h2>
                </li>


                <p>The odds of winning depend on the number of entries purchased.</p>

                <li><h2 id='can-i-withdraw-my-competition-entry'>Can I withdraw my competition entry?</h2>
                </li>


                <p>No, all entries are submitted to the smart contract and will then exist on the blockchain forever. Entries cannot be retracted.</p>

                <li><h2 id='is-there-a-limit-to-how-many-entries-i-can-buy'>Is there a limit to how many entries I can buy?</h2>
                </li>


                <p>Purchase limits may be imposed on competitions at times. We strongly encourage and support responsible participation at all times.</p>

                <li><h2 id='can-i-interact-via-the-smart-contract-directly'>Can I interact via the smart contract directly?</h2>
                </li>


                <p>While it is possible to enter directly from the smart contract, it’s not the preferred method of entry. On the website, we&#39;ve worked hard to deliver our users with an easy entry flow as well as presenting clear details on entry count, package pricing, and prize.</p>

                <li><h2 id='why-do-i-pay-gas-on-entries'>Why do I pay gas on entries?</h2>
                </li>


                <p>Gas is an unavoidable part of the Ethereum blockchain, Web3, and is applied to any transactional element. If we were to adjust our platform in a way that our competitions do not require gas, then we wouldn&#39;t be truly Web3.</p>

                <li><h2 id='why-is-gas-high-for-multiple-entry-packages'>Why is gas high for multiple-entry packages?</h2>
                </li>


                <p>As with all transactions on the Ethereum network, gas is required. When entering Competitions with multiple entry packages, every individual entry still needs to be written to our Competition smart contract, this requires gas. However, bigger entry packages are generally always cheaper on gas than purchasing an equal amount of entries individually.</p>

                <li><h2 id='can-i-enter-for-free'>Can I enter for free?</h2>
                </li>


                <p>Yes, some competitions will be free to enter.</p>

                <li><h2 id='do-i-get-my-eth-back-if-i-dont-win-a-competition'>Do I get my ETH back if I don&#39;t win a Competition?</h2>
                </li>

                <p>No. Entry costs are not returned to the participant if they do not win. ETH generated from Competition entries is used towards acquiring future Competition prizes.</p>
              </ol>

            </div>
          </div>
        </div>
      </main>
      {/* <Footer></Footer> */}
    </>
  );
}

export default FAQ;