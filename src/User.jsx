import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";
import { motion } from "framer-motion";
import Header from "./components/Header";
import ShipmentStatusTracker from "./ShipmentStatusTracker";
import { toast } from "sonner";
import TrackingProgress from "./components/TrackingProgress";
import useFormattedDate from "./hooks/useFormattedDate";
import Footer from "./components/Footer";
import Partners from "./components/Partners";

const transitionSettings = {
  duration: 0.8,
  ease: [0.6, -0.05, 0.01, 0.99],
};

const UserPage = () => {
  const { trackingCode } = useParams();
  const [cargo, setCargo] = useState(null);
  const [inputCode, setInputCode] = useState(trackingCode || "");
  const [isLoading, setIsLoading] = useState(false);
  const { formatTimestamp, formatDate } = useFormattedDate();
  useEffect(() => {
    if (trackingCode) {
      handleSearch(trackingCode);
    }
  }, [trackingCode]);

  const handleSearch = async (code) => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "shipments"),
        where("trackingCode", "==", code)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setCargo(querySnapshot.docs[0].data());
      } else {
        toast.error("Code not found");
        setCargo(null);
      }
    } catch (error) {
      toast.error("Error fetching cargo: " + error.message);
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(inputCode);
  };

  return (
    <div className="relative">
      <Header />
      <p className="lg:px-24 px-4 py-5 text-3xl bg-gray-100 flex font-sans">
        Track {cargo ? `: #${cargo.trackingCode}` : ""}
      </p>
      {/* <div className="absolute inset-0  brightness-75 -z-10"></div> */}
      <div className="min-h-screen  flex flex-col items-center bg-gray-200  pb-6 px-4 md:px-0">
      <div className="absolute inset-0  brightness-75 -z-10"></div> {!cargo && (
          <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg pt-24"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionSettings}
          >
            <label className="block text-[#102541] text-lg font-bold mb-2">
              Tracking Code:
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-[#102541] rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#102541]"
              />
            </label>

            <button
              type="submit"
              className="w-full flex justify-center items-center bg-[#102541] text-white py-2 px-4 rounded-md mt-4 hover:bg-black transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <TailSpin
                  visible={true}
                  height="24"
                  width="24"
                  color="#ffffff"
                  ariaLabel="tail-spin-loading"
                />
              ) : (
                "Search"
              )}
            </button>
          </motion.form>
        )}
        {isLoading && (
          <div className="w-full max-w-md mt-6 flex  justify-center">
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#102541"
              ariaLabel="tail-spin-loading"
            />
          </div>
        )}
        {cargo && !isLoading && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionSettings}
              className="max-w-[70vw] mx-auto p-6 space-y-8 border my-4 bg-white rounded-md shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center gap-2">
                <span className="text-orange-500">SHIPMENT</span>
                <span className="font-medium">#{cargo.trackingCode}</span>
              </div>

              {/* Status */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl animate-pulse font-medium">ON HOLD</h1>
                <p className="text-gray-600 italic">
                  Please check your parcel travel history for more details
                </p>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <p className="mb-8">
                  <TrackingProgress currentStatus={cargo.status} />
                </p>
                <h2 className="text-center font-medium">SHIPMENT ROUTE</h2>
              </div>
              <hr />
              {/* Route Map */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="relative">
                    <div className="h-0.5 bg-gray-300 absolute w-full top-6" />
                    <div className="relative flex justify-between items-center">
                      <span className="text-sm">{cargo.countryFrom.label}</span>
                      <div className="bg-yellow-100 p-3 rounded-lg text-center">
                        <span className="text-xs">Location</span>
                        <br />
                        <span className="text-xs">Turkey</span>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto mt-1 animate-pulse" />
                      </div>
                      <span className="text-sm">{cargo.countryTo.label}</span>
                    </div>
                    <div className="mt-2 text-center">
                      <span className="bg-yellow-400 text-xs px-2 py-1 rounded">
                        On Hold
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Travel History */}
              <div className="bg-yellow-50  p-4 text-center">
                <h3 className="text-xs text-gray-600 mb-3">
                  Last Travel History
                </h3>
                <p className="text-gray-800">Parcel Stops For Customs Check</p>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-4">Sender's Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 bg-gray-50 p-2">
                      <span className="text-xs font-bold">Name</span>
                      <span className="text-xs col-span-2">
                        {cargo.sender.name}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 bg-gray-50 p-2">
                      <span className="text-xs font-bold">Phone</span>
                      <span className="text-xs col-span-2">
                        {cargo.sender.phone}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 bg-gray-50 p-2">
                      <span className="text-xs font-bold">Email</span>
                      <span className="text-xs col-span-2">
                        {cargo.sender.email}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 bg-gray-50 p-2">
                      <span className="text-xs font-bold">From</span>
                      <span className="text-xs col-span-2">
                        {cargo.countryFrom.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-4">Receiver's Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 bg-gray-50 p-2">
                      <span className="text-xs font-bold">Name</span>
                      <span className="text-xs col-span-2">
                        {cargo.receiver.name}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 bg-gray-50 p-2">
                      <span className="text-xs font-bold">Phone</span>
                      <span className="text-xs col-span-2">
                        {cargo.receiver.phone}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 bg-gray-50 p-2">
                      <span className="text-xs font-bold">Email</span>
                      <span className="text-xs col-span-2">
                        {cargo.receiver.email}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 bg-gray-50 p-2">
                      <span className="text-xs font-bold">To</span>
                      <span className="text-xs col-span-2">
                        {cargo.countryTo.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              {/* Shipment Details */}
              <div className="space-y-4">
                <h2 className="text-center font-medium">SHIPMENT DETAILS</h2>
                <div className="flex justify-center">
                  {/* <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/seawavelogistics.com_track.php_v=AGSZ97THPBIJ(Nest%20Hub%20Max)%20(1).jpg-tWh3ABEOdH2iLonWNOW7aX4Jia31Im.jpeg"
                    alt="Golden Suitcase"
                    width={300}
                    height={300}
                    className="rounded-lg"
                  /> */}
                </div>
              </div>

              {/* Shipment Information Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-bold mb-1">TRACKING</h3>
                  <p className="text-sm">{cargo.trackingCode}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">SHIPMENT ID</h3>
                  <p className="text-sm">SWL42024500</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">SENDER</h3>
                  <p className="text-sm">{cargo.sender.name}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">RECEIVER</h3>
                  <p className="text-sm">{cargo.receiver.name}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">CONTENT</h3>
                  <p className="text-sm">{cargo.contentName}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">WEIGHT</h3>
                  <p className="text-sm">28kgKG</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">SHIP DATE</h3>
                  <p className="text-sm"> {formatDate(cargo.shippingDate)}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">ARRIVAL DATE</h3>
                  <p className="text-sm">{formatDate(cargo.arrivalDate)}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">SERVICE</h3>
                  <p className="text-sm">Trustway Logistics</p>
                </div>
              </div>
              <hr />
              {/* Shipment History */}
              <div className="space-y-4">
                <h2 className="text-center font-medium">SHIPMENT HISTORY</h2>
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="p-2 text-sm">SN</th>
                      <th className="p-2 text-sm">Time</th>
                      <th className="p-2 text-sm">Location</th>
                      <th className="p-2 text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50">
                      <td className="p-2 text-sm">1.</td>
                      <td className="p-2 text-sm">
                        {formatTimestamp(cargo.shippingDate)}
                      </td>
                      <td className="p-2 text-sm">{cargo.countryFrom.label}</td>
                      <td className="p-2 text-sm">
                        Parcel Shipped Successfully
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-2 text-sm">2.</td>
                      <td className="p-2 text-sm">
                        {formatTimestamp(cargo.arrivalDate)}
                      </td>
                      <td className="p-2 text-sm">{cargo.countryTo.label}</td>
                      <td className="p-2 text-sm">
                        Parcel arrived at Destination
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <Partners />
      <Footer />
    </div>
  );
};

export default UserPage;
