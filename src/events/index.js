/*
 * @LastEditors: Jerryk jerry@icewhale.org
 * @LastEditTime: 2023-03-17 16:46:57
 * @FilePath: /CasaOS-UI/src/events/index.js
 * @Description:
 *
 * Copyright (c) 2022 by IceWhale, All Rights Reserved.
 */

import {api}       from "@/service/service.js";
import message_bus from "@/events/message_bus.js";

export default function messageBus(name, params) {
	if (!params) {
		params = null
	}
	try {
		message_bus[name](params).then(res => {
			let properties = res.properties;
			let eventName = res.name;
			return api.post(`/v2/message_bus/event/casaos-ui/${eventName}`, properties);
		}).catch(error => {
			// Event publishing is best-effort telemetry: a missing/unstarted
			// message bus (or a 405 on this endpoint) must never surface as an
			// unhandled promise rejection OR as console spam. 404/405 = the
			// stack has no message-bus service at all — expected, stay silent.
			const status = error?.response?.status;
			if (status === 404 || status === 405) {
				return;
			}
			console.warn(`[messageBus] event publish failed: ${error.message || error}`);
		})
	} catch (error) {
		console.log(error);
	}
}
